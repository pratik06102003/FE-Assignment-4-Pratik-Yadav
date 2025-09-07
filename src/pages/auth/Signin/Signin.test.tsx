import { MemoryRouter } from 'react-router-dom';

import { combineReducers, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

import { authReducer } from '@store/auth';
import { messageReducer } from '@store/messages';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const signinMock = jest.fn();
jest.mock('@app/auth', () => ({
  signin: signinMock,
  listen: jest.fn(),
}));

const rootReducer = combineReducers({ auth: authReducer, messages: messageReducer });
const store = createStore(rootReducer, {
  auth: { loading: false, user: null },
});

import { Signin } from './Signin.page';

const renderPage = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    </Provider>,
  );

describe('Signin page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not calls signin when empty form is submitted', async () => {
    renderPage();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(signinMock).not.toHaveBeenCalled();

    const message = store.getState().messages;
    expect(message.infoMessage).toBeNull();
    expect(message.errorMessage).toBeNull();
  });

  test('calls signin when correct form is submitted', async () => {
    renderPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'mail@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'pass1234');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(signinMock).toHaveBeenCalledTimes(1);

    expect(signinMock).toHaveBeenCalledWith('mail@domain.com', 'pass1234');
    const message = store.getState().messages;
    expect(message.infoMessage).toBe('Sign in successful!!');
    expect(message.errorMessage).toBeNull();
  });

  test('Triggers errormessage if api throws error', async () => {
    signinMock.mockImplementationOnce(() => {
      throw new Error();
    });

    renderPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'mail@domain.com');
    await user.type(screen.getByLabelText(/password/i), 'pass1234');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(signinMock).toHaveBeenCalledTimes(1);

    const message = store.getState().messages;
    expect(message.errorMessage).toBe('Unexpected Error occurred');
    expect(message.infoMessage).toBeNull();
  });
});
