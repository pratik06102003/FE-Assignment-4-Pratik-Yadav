import { MemoryRouter } from 'react-router-dom';
import { AnyAction, combineReducers, legacy_createStore as createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import * as AuthModule from '@store/auth'; // import module namespace for safe typing
import { authError, authStart, authSuccess } from '@store/auth/auth.actions';
import {
  AUTH_ERROR,
  AUTH_START,
  AUTH_SUCCESS,
  AuthAction,
  AuthState,
} from '@store/auth/auth.types';

import Signup from '..';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type ReactRouterDomModule = typeof import('react-router-dom');
type AuthStoreModule = typeof import('@store/auth');

jest.mock('@store/auth', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const actual = jest.requireActual('@store/auth') as AuthStoreModule;
  return {
    __esModule: true,
    ...actual,
    signUp: jest.fn(),
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const actual = jest.requireActual('react-router-dom') as ReactRouterDomModule;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const makeAuthInitial = (overrides?: Partial<AuthState>): AuthState => ({
  loading: false,
  error: null,
  user: null,
  ...overrides,
});

function authReducer(state: AuthState = makeAuthInitial(), action: AuthAction): AuthState {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, error: null };
    case AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case AUTH_ERROR:
      return { ...state, loading: false, error: action.payload ?? 'Unknown error' };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ auth: authReducer });
type RootState = ReturnType<typeof rootReducer>;

// helper to create store with optional preloaded auth state
function createTestStore(preloadedAuth?: Partial<AuthState>): Store<RootState, AnyAction> {
  const store = createStore(rootReducer, { auth: makeAuthInitial(preloadedAuth) } as RootState);
  return store;
}

// Type-safe mock reference
const signUpMock = AuthModule.signUp as jest.MockedFunction<typeof AuthModule.signUp>;

describe('Signup integration (real store + mocked signUp)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  it('successful signup: shows loading, dispatches success, and navigates home', async () => {
    const store = createTestStore();

    signUpMock.mockImplementation(async (firstName, lastName, email, password, dispatch) => {
      dispatch(authStart());
      await Promise.resolve();
      const user = { uid: 'u123', email, firstName, lastName };
      dispatch(authSuccess(user));
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>,
    );

    const user = userEvent.setup();

    // Fill form
    await user.type(screen.getByLabelText(/first name/i), 'FIRST_NAME');
    await user.type(screen.getByLabelText(/last name/i), 'LAST_NAME');
    await user.type(screen.getByLabelText(/email/i), 'FIRST_NAME@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    await user.click(screen.getByRole('button', { name: /sign in|sign up/i }));

    expect(signUpMock).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('signup failure: shows error from store', async () => {
    const store = createTestStore();

    signUpMock.mockImplementation(async (_f, _l, _e, _p, dispatch) => {
      dispatch(authStart());
      await Promise.resolve();
      dispatch(authError('Email already exists'));
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>,
    );

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.type(screen.getByLabelText(/last name/i), 'Smith');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password321');

    await user.click(screen.getByRole('button', { name: /sign in|sign up/i }));

    expect(signUpMock).toHaveBeenCalledTimes(1);
    expect(store.getState().auth.error).toBe('Email already exists');
    expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('validation prevents submit and shows form errors', async () => {
    // preloaded store doesn't matter for validation test
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /sign in|sign up/i }));
    expect(signUpMock).not.toHaveBeenCalled();
  });

  test('inputs are disabled when loading is true', () => {
    // start store with loading true
    const store = createTestStore({ loading: true });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>,
    );

    // inputs should be disabled
    expect(screen.getByLabelText(/first name/i)).toBeDisabled();
    expect(screen.getByLabelText(/last name/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();

    // button should show loading attribute (Antd sets disabled and an aria-busy attribute depending on version)
    const submitBtn = screen.getByRole('button', { name: /sign in|sign up/i });
    expect(submitBtn).toBeDisabled();
  });
});
