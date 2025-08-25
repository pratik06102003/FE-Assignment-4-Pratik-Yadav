import { authError, authStart, authSuccess } from './auth.actions';
import { authReducer } from './auth.reducer';
import { AuthState, AuthUser } from './auth.types';

describe('authReducer', () => {
  const initialState: AuthState = { user: null, loading: false, error: null };

  test('AUTH_START sets loading and clears error', () => {
    const state = authReducer(initialState, authStart());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.user).toBeNull();
  });

  test('AUTH_SUCCESS stores user and stops loading', () => {
    const user: AuthUser = { uid: 'u1', email: 'test@test.com' };
    const state = authReducer(initialState, authSuccess(user));
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.error).toBeNull();
  });

  test('AUTH_ERROR stores error and stops loading', () => {
    const state = authReducer(initialState, authError('Boom'));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Boom');
    expect(state.user).toBeNull();
  });
});
