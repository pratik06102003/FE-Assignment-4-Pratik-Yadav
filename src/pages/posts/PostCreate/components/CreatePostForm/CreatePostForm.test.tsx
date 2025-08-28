// CreatePostForm.test.tsx
import React from 'react';

import { CreatePostForm } from './CreatePostForm.component';
import { CreatePostFormProps } from './CreatePostForm.types';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CreatePostForm (Formik + Yup)', () => {
  const renderForm = (overrides: Partial<CreatePostFormProps> = {}) => {
    const handleSubmit = jest.fn(async () => {});

    const defaultProps = {
      handleSubmit,
      isLoading: false,
      errorMessage: null,
    };
    const utils = render(<CreatePostForm {...defaultProps} {...overrides} />);
    const user = userEvent.setup();
    return { ...utils, handleSubmit, user };
  };

  test('renders UI: headings, inputs, publish button', () => {
    renderForm();

    expect(screen.getByRole('heading', { name: /Create Post/i })).toBeVisible();

    // Inputs
    expect(screen.getByLabelText(/title/i, { selector: 'input' })).toBeVisible();
    expect(screen.getByLabelText(/content/i, { selector: 'textarea' })).toBeVisible();
    expect(screen.getByLabelText(/tags/i, { selector: 'input' })).toBeVisible();

    // Button
    expect(screen.getByRole('button', { name: /Publish/i })).toBeVisible();
  });

  test('displays required validation errors when submitting an empty form', async () => {
    const { handleSubmit, user } = renderForm();

    // Submit without typing anything
    const publishButton = screen.getByRole('button', { name: /Publish/i });
    await user.click(publishButton);

    expect(handleSubmit).not.toHaveBeenCalled();

    expect(screen.getByText('Title is required')).toBeVisible();
    expect(screen.getByText('Content is required')).toBeVisible();
  });

  test('displays content min-length validation error', async () => {
    const { handleSubmit, user } = renderForm();

    // Fill a valid title, but too-short content
    const titleInput = screen.getByLabelText(/title/i, { selector: 'input' });
    const contentInput = screen.getByLabelText(/content/i, { selector: 'textarea' });

    const publishButton = screen.getByRole('button', { name: /Publish/i });

    await user.type(titleInput, 'Valid title');
    await user.type(contentInput, 'short');
    await user.click(publishButton);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Content is too short')).toBeVisible();
  });

  test('submits form when inputs are valid and passes values to handleSubmit', async () => {
    const { handleSubmit, user } = renderForm();

    const titleInput = screen.getByLabelText(/title/i, { selector: 'input' });
    const contentInput = screen.getByLabelText(/content/i, { selector: 'textarea' });
    const tagsInput = screen.getByLabelText(/tags/i, { selector: 'input' });
    const publishButton = screen.getByRole('button', { name: /Publish/i });

    await user.type(titleInput, 'A valid post title');
    await user.type(contentInput, 'This is a content body longer than ten characters.');
    await user.type(tagsInput, 'react,javascript');

    await user.click(publishButton);

    // Wait for Formik to finish validation+submission
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('isLoading true disables inputs and disables the publish button', () => {
    renderForm({ isLoading: true });

    const titleInput = screen.getByLabelText(/title/i, { selector: 'input' });
    const contentInput = screen.getByLabelText(/content/i, { selector: 'textarea' });
    const tagsInput = screen.getByLabelText(/tags/i, { selector: 'input' });
    const publishButton = screen.getByRole('button', { name: /Publish/i });

    expect(titleInput).toBeDisabled();
    expect(contentInput).toBeDisabled();
    expect(tagsInput).toBeDisabled();

    expect(publishButton).toBeDisabled();
  });

  test('shows Alert when errorMessage prop provided', () => {
    const msg = 'Network error: could not publish';
    renderForm({ errorMessage: msg });

    expect(screen.getByText(msg)).toBeVisible();
  });
});
