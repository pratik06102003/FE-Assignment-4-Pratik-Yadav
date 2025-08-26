import { ReactNode } from 'react';

import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AnyAction, combineReducers, legacy_createStore as createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import { signIn } from '@store/auth';
import {
  AUTH_ERROR,
  AUTH_START,
  AUTH_SUCCESS,
  AuthAction,
  AuthState,
} from '@store/auth/auth.types';

import SignIn from '../Signin.page';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type AuthStoreModule = typeof import('@store/auth');

jest.mock('@store/auth', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const actual = jest.requireActual('@store/auth') as AuthStoreModule;
  return {
    ...actual,
    signIn: jest.fn(),
  };
});
const getAuthState = (overrides?: Partial<AuthState>): AuthState => ({
  loading: false,
  error: null,
  user: null,
  message: null,
  ...overrides,
});

function authReducer(state: AuthState = getAuthState(), action: AuthAction): AuthState {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, error: null };
    case AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload.user, error: null };
    case AUTH_ERROR:
      return { ...state, loading: false, error: action.payload ?? 'Unknown error' };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ auth: authReducer });
type RootState = ReturnType<typeof rootReducer>;

function renderWithProviders(ui: ReactNode, preloadedState?: Partial<RootState>) {
  const store: Store<RootState, AnyAction> = createStore(rootReducer, {
    auth: getAuthState(),
    ...preloadedState,
  } as RootState);
  const utils = render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );
  return { store, ...utils };
}

describe('SignIn', () => {
  const signInMock = jest.mocked(signIn);
  const navigateMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as unknown as jest.Mock).mockReturnValue(navigateMock);
  });
  it('renders all form fields', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    renderWithProviders(<SignIn />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    const errors = await screen.findAllByText(/required/i);
    expect(errors.length).toBeGreaterThanOrEqual(2);
  });

  test('calls signUp with correct arguments on valid submit (user-event)', async () => {
    const { store } = renderWithProviders(<SignIn />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/email/i), 'email@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(signInMock).toHaveBeenCalledTimes(1);

    const [email, password, dispatchArg] = signInMock.mock.calls[0];

    expect({ email, password }).toEqual({
      email: 'email@domain.com',
      password: 'password123',
    });
    expect(dispatchArg).toBe(store.dispatch);
  });

  test('disables inputs when loading is true', () => {
    renderWithProviders(<SignIn />, {
      auth: getAuthState({ loading: true }),
    });
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
  });

  test('shows error alert when error exists', () => {
    renderWithProviders(<SignIn />, {
      auth: getAuthState({ error: 'Signup failed' }),
    });
    expect(screen.getByText(/signup failed/i)).toBeInTheDocument();
  });

  test('navigates to home when user exists', () => {
    renderWithProviders(<SignIn />, {
      auth: getAuthState({ user: { uid: '1', email: 'test@domin.com' } }),
    });
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
