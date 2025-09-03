import { MemoryRouter } from 'react-router-dom';

import type * as AntDModule from 'antd';

import type { AuthState } from '@store/auth';
import type { useAppSelector } from '@store/root';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mocking useAppDispatch, useAppSelector
const mockUseAppSelector: jest.MockedFunction<typeof useAppSelector> = jest.fn();
jest.mock('@store/root', () => ({
  useAppSelector: mockUseAppSelector,
}));

// Mocking  signUpservice from use auth
const mockSignupService = jest.fn();
jest.mock('@store/auth', () => ({
  useAuth: jest.fn(() => ({
    signupService: mockSignupService,
  })),
}));

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
  );

  return { ...utils, user };
};

describe('Signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls signUp with correct args when form is submitted', async () => {
    const testAuthState: AuthState = {
      loading: false,
      errorMessage: null,
      user: null,
      infoMessage: null,
    };
    mockUseAppSelector.mockReturnValue(testAuthState);

    const { user } = renderPage();

    await user.type(screen.getByLabelText(/first name/i), 'firstName');
    await user.type(screen.getByLabelText(/last name/i), 'lastName');
    await user.type(screen.getByLabelText(/email/i), 'mail@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'pass1234');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

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

    renderPage();

    expect(mockApi.error).toHaveBeenCalledTimes(1);

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
  });
});
