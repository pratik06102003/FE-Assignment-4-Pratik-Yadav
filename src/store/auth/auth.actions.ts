import type { User } from '@app/auth';

import { AUTH_ERROR, AUTH_START, AUTH_SUCCESS } from './auth.constants';
import type {
  AuthFailureActionType,
  AuthStartActionType,
  AuthSuccessActionType,
} from './auth.types';

export const authStart = (): AuthStartActionType => ({ type: AUTH_START });

export const authSuccess = (user: User | null): AuthSuccessActionType => ({
  type: AUTH_SUCCESS,
  payload: { user },
});

export const authFailure = (): AuthFailureActionType => ({
  type: AUTH_ERROR,
});
