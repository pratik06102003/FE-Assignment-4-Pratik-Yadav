import {
  AUTH_ERROR,
  AUTH_START,
  AUTH_SUCCESS,
  AuthErrorActionType,
  AuthStartActionType,
  AuthSuccessActionType,
  AuthUser,
} from './auth.types';

export const authStart = (): AuthStartActionType => ({ type: AUTH_START });

export const authSuccess = (user: AuthUser | null): AuthSuccessActionType => ({
  type: AUTH_SUCCESS,
  payload: user,
});

export const authError = (errorMessage: string): AuthErrorActionType => ({
  type: AUTH_ERROR,
  payload: errorMessage,
});
