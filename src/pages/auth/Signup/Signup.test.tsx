import { MemoryRouter, Navigate } from 'react-router-dom';

import { notification } from 'antd';

import { AuthState, signup } from '@store/auth';
import { AppDispatch, useAppDispatch, useAppSelector } from '@store/root';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mocking useAppDispatch, useAppSelector
const mockUseAppDispatch: jest.MockedFunction<typeof useAppDispatch> = jest.fn();
const mockUseAppSelector: jest.MockedFunction<typeof useAppSelector> = jest.fn();
jest.mock('@store/root', () => ({
  useAppDispatch: mockUseAppDispatch,
  useAppSelector: mockUseAppSelector,
}));

// Mocking useAppDispatch, signUp
const mockSignUp: jest.MockedFunction<typeof signup> = jest.fn();
jest.mock('@store/auth', () => ({
  signup: mockSignUp,
}));

// Mocking useNavigate
type ReactRouterDomModule = typeof import('react-router-dom');
const mockNavigate: jest.MockedFunction<typeof Navigate> = jest.fn();
jest.mock('react-router-dom', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const actual = jest.requireActual('react-router-dom') as ReactRouterDomModule;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

type UseNotificationReturn = ReturnType<typeof notification.useNotification>;
const mockApi: UseNotificationReturn[0] = {
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  open: jest.fn(),
  destroy: jest.fn(),
};
const contextHolder: UseNotificationReturn[1] = <div data-testid="mock-context-holder" />;
type AntDModule = typeof import('antd');
jest.mock('antd', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const actualAntd = jest.requireActual('antd') as AntDModule;
  return {
    ...actualAntd,
    notification: {
      ...actualAntd.notification,
      useNotification: () => [mockApi, contextHolder],
    },
  };
});

import Signup from './Signup.page';

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
    const mockDispatch: AppDispatch = jest.fn();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
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

    expect(mockSignUp).toHaveBeenCalledTimes(1);

    expect(mockSignUp).toHaveBeenCalledWith(
      'firstName',
      'lastName',
      'mail@domain.com',
      'pass1234',
      mockDispatch,
    );
  });

  test("navigates to '/' when user exists in auth slice", () => {
    const testAuthState: AuthState = {
      loading: false,
      errorMessage: null,
      infoMessage: null,
      user: { uid: 'u1', email: 'Alice' },
    };

    mockUseAppSelector.mockReturnValue(testAuthState);
    renderPage();
    expect(mockNavigate).toHaveBeenCalledWith('/');
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
        message: 'Hold on, something is wrong',
        description: errorMsg,
        placement: 'topLeft',
      }),
    );

    // context holder should render
    expect(screen.getByTestId('mock-context-holder')).toBeVisible();
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
