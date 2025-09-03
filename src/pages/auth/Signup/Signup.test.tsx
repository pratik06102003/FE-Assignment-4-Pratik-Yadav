import { MemoryRouter } from 'react-router-dom';

import { combineReducers, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

<<<<<<< HEAD
import { authReducer } from '@store/auth';
import { messageReducer } from '@store/messages';
=======
import type { AuthState } from '@store/auth';
import type { useAppSelector } from '@store/root';
>>>>>>> 82b3fb9 (YP_RU_03: Auth 2 - Signin: Restructured service)

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

<<<<<<< HEAD
const signupMock = jest.fn();
jest.mock('@app/auth', () => ({
  signup: signupMock,
  listen: jest.fn(),
}));

const rootReducer = combineReducers({ auth: authReducer, messages: messageReducer });
const store = createStore(rootReducer, {
  auth: { loading: false, user: null },
});

import { Signup } from './Signup.page';

const renderPage = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </Provider>,
=======
// Mocking useAppSelector
const mockUseAppSelector: jest.MockedFunction<typeof useAppSelector> = jest.fn();
jest.mock('@store/root', () => ({
  useAppSelector: mockUseAppSelector,
}));

// Mocking signUpservice from use auth
const mockSignupService = jest.fn();
jest.mock('@store/auth', () => ({
  useAuth: jest.fn(() => ({
    signupService: mockSignupService,
  })),
}));

// Mocking useNotificationApi
type UseNotificationReturn = ReturnType<typeof AntDModule.notification.useNotification>;
const mockApi: UseNotificationReturn[0] = {
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  open: jest.fn(),
  destroy: jest.fn(),
};
jest.mock('@contexts/Notification', () => ({
  useNotificationApi: () => mockApi,
}));

import { Signup } from './Signup.page';

const renderPage = () => {
  const user = userEvent.setup();
  const utils = render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>,
>>>>>>> 82b3fb9 (YP_RU_03: Auth 2 - Signin: Restructured service)
  );

describe('Signup page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

<<<<<<< HEAD
  test('does not calls signUp when empty form is submitted', async () => {
    renderPage();
    const user = userEvent.setup();
=======
  test('calls signUp with correct args when form is submitted', async () => {
    const testAuthState: AuthState = {
      loading: false,
      errorMessage: null,
      user: null,
      infoMessage: null,
    };
    mockUseAppSelector.mockReturnValue(testAuthState);
>>>>>>> 82b3fb9 (YP_RU_03: Auth 2 - Signin: Restructured service)

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(signupMock).not.toHaveBeenCalled();

    const message = store.getState().messages;
    expect(message.infoMessage).toBeNull();
    expect(message.errorMessage).toBeNull();
  });

  test('calls signUp when correct form is submitted', async () => {
    renderPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'firstName');
    await user.type(screen.getByLabelText(/last name/i), 'lastName');
    await user.type(screen.getByLabelText(/email/i), 'mail@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'pass1234');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

<<<<<<< HEAD
    expect(signupMock).toHaveBeenCalledTimes(1);

    expect(signupMock).toHaveBeenCalledWith('firstName', 'lastName', 'mail@domain.com', 'pass1234');
    const message = store.getState().messages;
    expect(message.infoMessage).toBe('User Signup Successful');
    expect(message.errorMessage).toBeNull();
  });

  test('Triggers errormessage if api throws error', async () => {
    signupMock.mockImplementationOnce(() => {
      throw new Error();
    });
=======
    expect(mockSignupService).toHaveBeenCalledTimes(1);

    expect(mockSignupService).toHaveBeenCalledWith(
      'firstName',
      'lastName',
      'mail@domain.com',
      'pass1234',
    );
  });

  test('calls notification.error when errorMessage exists in auth slice', () => {
    const errorMsg = 'Server errorMessage: email already taken';
    const testAuthState: AuthState = {
      loading: false,
      errorMessage: errorMsg,
      user: null,
      infoMessage: null,
    };

    mockUseAppSelector.mockReturnValue(testAuthState);
>>>>>>> 82b3fb9 (YP_RU_03: Auth 2 - Signin: Restructured service)

    renderPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'firstName');
    await user.type(screen.getByLabelText(/last name/i), 'lastName');
    await user.type(screen.getByLabelText(/email/i), 'mail@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'pass1234');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

<<<<<<< HEAD
    expect(signupMock).toHaveBeenCalledTimes(1);

    const message = store.getState().messages;
    expect(message.errorMessage).toBe('Unexpected Error occurred');
    expect(message.infoMessage).toBeNull();
=======
    expect(mockApi.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Hold on, something is wrong !!',
        description: errorMsg,
        placement: 'topLeft',
      }),
    );
  });

  test('calls notification.info when infoMessage exists in auth slice', () => {
    const infoMsg = 'Sign in successful';
    const testAuthState: AuthState = {
      loading: false,
      errorMessage: null,
      user: null,
      infoMessage: infoMsg,
    };

    mockUseAppSelector.mockReturnValue(testAuthState);

    renderPage();

    expect(mockApi.info).toHaveBeenCalledTimes(1);

    expect(mockApi.info).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Here you go',
        description: infoMsg,
        placement: 'topLeft',
      }),
    );
  });

  test('passes loading true to SignupForm (submit button disabled)', () => {
    const testAuthState: AuthState = {
      loading: true,
      errorMessage: null,
      user: null,
      infoMessage: null,
    };

    mockUseAppSelector.mockReturnValue(testAuthState);

    renderPage();

    const submitBtn = screen.getByRole('button', { name: /sign up/i });
    expect(submitBtn).toBeDisabled();
>>>>>>> 82b3fb9 (YP_RU_03: Auth 2 - Signin: Restructured service)
  });
});
