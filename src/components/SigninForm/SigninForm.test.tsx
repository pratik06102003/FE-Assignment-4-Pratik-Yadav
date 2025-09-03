import { MemoryRouter } from 'react-router-dom';

import type { FormikHelpers } from 'formik';

import { SigninForm } from './SigninForm.component';
import type { SigninFormikValues, SigninFormsProps } from './SigninForm.types';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderForm = (props?: Partial<SigninFormsProps>) => {
  const mockHandleSubmit: jest.Mocked<
    (values: SigninFormikValues, helpers: FormikHelpers<SigninFormikValues>) => Promise<void>
  > = jest.fn();
  const isLoading = props?.isLoading ?? false;
  const user = userEvent.setup();

  const utils = render(
    <MemoryRouter>
      <SigninForm isLoading={isLoading} handleSubmit={mockHandleSubmit} />
    </MemoryRouter>,
  );

  return { ...utils, user, mockHandleSubmit };
};

describe('Signin', () => {
  it('renders all form fields', () => {
    renderForm();
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const signinButton = screen.getByRole('button', { name: /sign in/i });
    const signupLink = screen.getByRole('link', { name: /signup/i });
    const resetPasswordLink = screen.getByRole('link', { name: /reset password/i });

    expect(emailField).toBeVisible();
    expect(passwordField).toBeVisible();
    expect(signinButton).toBeVisible();
    expect(signupLink).toBeVisible();
    expect(resetPasswordLink).toBeVisible();

    expect(signupLink).toHaveAttribute('href', '/auth/signup');
    expect(resetPasswordLink).toHaveAttribute('href', '/auth/reset-password');
  });

  test('shows validation errors on empty submit', async () => {
    const { user } = renderForm();
    const signinButton = screen.getByRole('button', { name: /sign in/i });

    await user.click(signinButton);
    expect(screen.getByText(/email is required/i)).toBeVisible();
    expect(screen.getByText(/password is required/i)).toBeVisible();
  });

  test('calls handleSubmit with correct arguments on valid submit (user-event)', async () => {
    const { user, mockHandleSubmit } = renderForm();

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const signinButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailField, 'email@domain.com');
    await user.type(passwordField, 'password123');
    await user.click(signinButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith(
      {
        email: 'email@domain.com',
        password: 'password123',
      },
      expect.any(Object) as FormikHelpers<SigninFormikValues>,
    );
  });

  test('disables inputs when loading is true', () => {
    renderForm({ isLoading: true });
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const signinButton = screen.getByRole('button', { name: /sign in/i });

    expect(emailField).toBeDisabled();
    expect(passwordField).toBeDisabled();
    expect(signinButton).toBeDisabled();
  });
});
