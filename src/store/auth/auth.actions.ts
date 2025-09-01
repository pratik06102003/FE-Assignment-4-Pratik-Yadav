import type { User } from '@app/auth';

import type { AuthErrorActionType, AuthStartActionType, AuthSuccessActionType } from './auth.types';
import { AUTH_ERROR, AUTH_START, AUTH_SUCCESS } from './auth.types';

export const authStart = (): AuthStartActionType => ({ type: AUTH_START });

export const authSuccess = (user: User | null, infoMessage?: string): AuthSuccessActionType => ({
  type: AUTH_SUCCESS,
  payload: { infoMessage, user },
});

export const authError = (errorMessage: string): AuthErrorActionType => ({
  type: AUTH_ERROR,
  payload: { errorMessage },
});
