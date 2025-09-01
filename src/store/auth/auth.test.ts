import type { User } from '@app/auth';

import { authError, authStart, authSuccess } from './auth.actions';
import { authReducer } from './auth.reducer';
import type { AuthState } from './auth.types';

describe('authReducer', () => {
  const initialState: AuthState = {
    user: null,
    loading: false,
    errorMessage: null,
    infoMessage: null,
  };

  test('AUTH_START sets loading and clears errorMessage', () => {
    const state = authReducer(initialState, authStart());
    expect(state.loading).toBe(true);
    expect(state.errorMessage).toBeNull();
    expect(state.infoMessage).toBeNull();
    expect(state.user).toBeNull();
  });

  test('AUTH_SUCCESS stores user and stops loading', () => {
    const user: User = { uid: 'u1', email: 'test@test.com' };
    const state = authReducer(initialState, authSuccess(user, 'successful'));
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBeNull();
    expect(state.infoMessage).toBe('successful');
    expect(state.user).toEqual(user);
  });

  test('AUTH_ERROR stores errorMessage and stops loading', () => {
    const state = authReducer(initialState, authError('Boom'));
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe('Boom');
    expect(state.infoMessage).toBeNull();
    expect(state.user).toBeNull();
  });
});
