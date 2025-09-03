import type { User } from '@app/auth';

import { authFailure, authStart, authSuccess } from './auth.actions';
import { authReducer } from './auth.reducer';
import type { AuthState } from './auth.types';
<<<<<<< HEAD
=======

>>>>>>> 82b3fb9 (YP_RU_03: Auth 2 - Signin: Restructured service)
describe('authReducer', () => {
  const initialState: AuthState = {
    user: null,
    loading: false,
  };

  test('AUTH_START sets loading and clears errorMessage', () => {
    const state = authReducer(initialState, authStart());
    expect(state.loading).toBe(true);
    expect(state.user).toBeNull();
  });

  test('AUTH_SUCCESS stores user and stops loading', () => {
    const user: User = { uid: 'u1', email: 'test@test.com' };
<<<<<<< HEAD
    const state = authReducer(initialState, authSuccess(user));
=======
    const state = authReducer(initialState, authSuccess(user, 'successful'));
>>>>>>> 82b3fb9 (YP_RU_03: Auth 2 - Signin: Restructured service)
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
  });

  test('AUTH_ERROR stores errorMessage and stops loading', () => {
    const state = authReducer(initialState, authFailure());
    expect(state.loading).toBe(false);
    expect(state.user).toBeNull();
  });
});
