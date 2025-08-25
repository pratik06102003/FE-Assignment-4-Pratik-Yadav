import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, combineReducers, AnyAction, Store } from 'redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { signUp } from '@store/auth';
import Signup from '../Signup.page';
import {
  AUTH_ERROR,
  AUTH_START,
  AUTH_SUCCESS,
  AuthAction,
  AuthState,
} from '@store/auth/auth.types';
import { ReactNode } from 'react';

type AuthStoreModule = typeof import('@store/auth');

jest.mock('@store/auth', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const actual = jest.requireActual('@store/auth') as AuthStoreModule;
  return {
    ...actual,
    signUp: jest.fn(),
  };
});
const getAuthState = (overrides?: Partial<AuthState>): AuthState => ({
  loading: false,
  error: null,
  user: null,
  ...overrides,
});

function authReducer(state: AuthState = getAuthState(), action: AuthAction): AuthState {
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

describe('Signup', () => {
  const signUpMock = jest.mocked(signUp);
  const navigateMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as unknown as jest.Mock).mockReturnValue(navigateMock);
  });
  it('renders all form fields', () => {
    renderWithProviders(<Signup />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    renderWithProviders(<Signup />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /sign up/i }));
    const errors = await screen.findAllByText(/required/i);
    expect(errors.length).toBeGreaterThanOrEqual(4);
  });

  test('calls signUp with correct arguments on valid submit (user-event)', async () => {
    const { store } = renderWithProviders(<Signup />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/first name/i), 'firstName');
    await user.type(screen.getByLabelText(/last name/i), 'lastName');
    await user.type(screen.getByLabelText(/email/i), 'email@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(signUpMock).toHaveBeenCalledTimes(1);

    const [firstName, lastName, email, password, dispatchArg] = signUpMock.mock.calls[0];

    expect({ firstName, lastName, email, password }).toEqual({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@domain.com',
      password: 'password123',
    });
    expect(dispatchArg).toBe(store.dispatch);
  });

  test('disables inputs when loading is true', () => {
    renderWithProviders(<Signup />, {
      auth: getAuthState({ loading: true }),
    });
    expect(screen.getByLabelText(/first name/i)).toBeDisabled();
    expect(screen.getByLabelText(/last name/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
  });

  test('shows error alert when error exists', () => {
    renderWithProviders(<Signup />, {
      auth: getAuthState({ error: 'Signup failed' }),
    });
    expect(screen.getByText(/signup failed/i)).toBeInTheDocument();
  });

  test('navigates to home when user exists', () => {
    renderWithProviders(<Signup />, {
      auth: getAuthState({ user: { uid: '1', email: 'test@domin.com' } }),
    });
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
