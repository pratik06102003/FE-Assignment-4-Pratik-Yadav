import { MemoryRouter } from 'react-router-dom';

import { FormikHelpers } from 'formik';

import { SignupForm } from './SignupForm.component';
import { SignupFormikValues, SignUpFormsProps } from './SignupForm.types';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderComponent = (props?: Partial<SignUpFormsProps>) => {
  const mockHandleSubmit: jest.Mocked<
    (values: SignupFormikValues, helpers: FormikHelpers<SignupFormikValues>) => Promise<void>
  > = jest.fn();
  const isLoading = props?.isLoading ?? false;
  const user = userEvent.setup();

  const utils = render(
    <MemoryRouter>
      <SignupForm isLoading={isLoading} handleSubmit={mockHandleSubmit} />
    </MemoryRouter>,
  );

  return { ...utils, user, mockHandleSubmit };
};

describe('Signup', () => {
  it('renders all form fields', () => {
    renderComponent();
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameFiled = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const signupButton = screen.getByRole('button', { name: /sign up/i });
    const signinLink = screen.getByRole('link', { name: /signin/i });

    expect(firstNameField).toBeVisible();
    expect(lastNameFiled).toBeVisible();
    expect(emailField).toBeVisible();
    expect(passwordField).toBeVisible();
    expect(signupButton).toBeVisible();
    expect(signinLink).toBeVisible();
    expect(signinLink).toHaveAttribute('href', '/auth/signin');
  });

  test('shows validation errors on empty submit', async () => {
    const { user } = renderComponent();
    const signupButton = screen.getByRole('button', { name: /sign up/i });

    await user.click(signupButton);
    expect(screen.getByText(/first name is required/i)).toBeVisible();
    expect(screen.getByText(/last name is required/i)).toBeVisible();
    expect(screen.getByText(/email is required/i)).toBeVisible();
    expect(screen.getByText(/password is required/i)).toBeVisible();
  });

  test('calls signUp with correct arguments on valid submit (user-event)', async () => {
    const { user, mockHandleSubmit } = renderComponent();

    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameFiled = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const signupButton = screen.getByRole('button', { name: /sign up/i });

    await user.type(firstNameField, 'firstName');
    await user.type(lastNameFiled, 'lastName');
    await user.type(emailField, 'email@domain.com');
    await user.type(passwordField, 'password123');
    await user.click(signupButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith(
      {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email@domain.com',
        password: 'password123',
      },
      expect.any(Object) as FormikHelpers<SignupFormikValues>,
    );
  });

  test('disables inputs when loading is true', () => {
    renderComponent({ isLoading: true });
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameFiled = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const signupButton = screen.getByRole('button', { name: /sign up/i });

    expect(firstNameField).toBeDisabled();
    expect(lastNameFiled).toBeDisabled();
    expect(emailField).toBeDisabled();
    expect(passwordField).toBeDisabled();
    expect(signupButton).toBeDisabled();
  });
});
