import { MemoryRouter } from 'react-router-dom';

import { combineReducers, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

import { authReducer } from '@store/auth';
import { DUMB_USER } from '@store/auth/auth.constants';
import { messageReducer } from '@store/messages';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const signupMock = jest.fn();
jest.mock('@app/auth', () => ({
  signup: signupMock,
  listen: jest.fn(),
}));

const rootReducer = combineReducers({ auth: authReducer, messages: messageReducer });
const store = createStore(rootReducer, {
  auth: { loading: false, user: DUMB_USER },
});

import { Signup } from './Signup.page';

const renderPage = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </Provider>,
  );

describe('Signup page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not calls signUp when empty form is submitted', async () => {
    renderPage();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(signupMock).not.toHaveBeenCalled();

    const message = store.getState().messages;
    expect(message.infoMessage).toBe('');
    expect(message.errorMessage).toBe('');
  });

  test('calls signUp when correct form is submitted', async () => {
    renderPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'firstName');
    await user.type(screen.getByLabelText(/last name/i), 'lastName');
    await user.type(screen.getByLabelText(/email/i), 'mail@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'pass1234');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(signupMock).toHaveBeenCalledTimes(1);

    expect(signupMock).toHaveBeenCalledWith('firstName', 'lastName', 'mail@domain.com', 'pass1234');
    const message = store.getState().messages;
    expect(message.infoMessage).toBe('User Signup Successful');
    expect(message.errorMessage).toBe('');
  });

  test('Triggers errormessage if api throws error', async () => {
    signupMock.mockImplementationOnce(() => {
      throw new Error();
    });

    renderPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'firstName');
    await user.type(screen.getByLabelText(/last name/i), 'lastName');
    await user.type(screen.getByLabelText(/email/i), 'mail@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'pass1234');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(signupMock).toHaveBeenCalledTimes(1);

    const message = store.getState().messages;
    expect(message.errorMessage).toBe('Unexpected Error occurred');
    expect(message.infoMessage).toBe('');
  });
});
