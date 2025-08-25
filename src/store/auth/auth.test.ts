import { authReducer } from './auth.reducer';
import { authStart, authSuccess, authError } from './auth.actions';
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

// jest.mock('./auth.utils');
jest.mock('@app/auth', () => ({
  authServices: {
    signUp: jest.fn(),
    signOut: jest.fn(),
  },
}));

// import { authServices } from '@app/auth';

// const mockedSignUp = jest.mocked(authServices.signUp, true);
// const mockedMapFirebaseError = jest.mocked(mapFirebaseError);

// describe('authService.signUp', () => {
//   const dispatch = jest.fn();
//   test('dispatches start -> success', async () => {
//     const user = { uid: '123', email: 't@t.com' };
//     mockedSignUp.mockResolvedValueOnce(user);
//     await signUp('Pratik', 'yadav', 't@t.com', 'secret', dispatch);
// expect(dispatch).toHaveBeenNthCalledWith(1, authStart());
// expect(mockedSignUp).toHaveBeenCalledWith('Pratik', 'Yadav', 't@t.com', 'secret');
// expect(dispatch).toHaveBeenNthCalledWith(2, authSuccess(user));
// });
// it('dispatches start -> error with mapped message on failure', async () => {
//   mockedSignUp.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
//   mockedMapFirebaseError.mockReturnValue('Email already in use');
//   await signUp('Pratik', 'Yadav', 'dup@t.com', 'secret', dispatch);
//   expect(dispatch).toHaveBeenNthCalledWith(1, authStart());
//   expect(dispatch).toHaveBeenNthCalledWith(2, authError('Email already in use'));
// });
// });
