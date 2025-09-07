import { MemoryRouter } from 'react-router-dom';

import type { FormikHelpers } from 'formik';
import { ValidationError } from 'yup';

import { SignupForm, SignupSchema } from './SignupForm.component';
import type { SignupFormikValues, SignUpFormsProps } from './SignupForm.types';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderForm = (props?: Partial<SignUpFormsProps>) => {
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
    renderForm();
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
    const { user } = renderForm();

    const firstNameField = screen.getByLabelText<HTMLInputElement>(/first name/i);
    const lastNameField = screen.getByLabelText<HTMLInputElement>(/last name/i);
    const emailField = screen.getByLabelText<HTMLInputElement>(/email/i);
    const passwordField = screen.getByLabelText<HTMLInputElement>(/password/i);
    const signupButton = screen.getByRole('button', { name: /sign up/i });

    await user.click(signupButton);
    const values = {
      firstName: firstNameField.value,
      lastName: lastNameField.value,
      email: emailField.value,
      password: passwordField.value,
    };

    try {
      await SignupSchema.validate(values, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        const messages = err.inner.map((e) => e.message);

        expect(messages).toContain('First name is required');
        expect(messages).toContain('Last name is required');
        expect(messages).toContain('Email is required');
        expect(messages).toContain('Password is required');
      } else {
        throw err;
      }
    }
  });

  test('calls signUp with correct arguments on valid submit (user-event)', async () => {
    const { user, mockHandleSubmit } = renderForm();

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
    renderForm({ isLoading: true });
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
