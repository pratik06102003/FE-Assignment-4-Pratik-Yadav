import type { User } from '@app/auth';

import type { AUTH_ERROR, AUTH_SIGNOUT, AUTH_START, AUTH_SUCCESS } from './auth.constants';

export type AuthState = {
  user: User | null;
  loading: boolean;
};

export type AuthStartActionType = {
  type: typeof AUTH_START;
};
export type AuthSuccessActionType = {
  type: typeof AUTH_SUCCESS;
  payload: { user: User | null };
};
export type AuthFailureActionType = {
  type: typeof AUTH_ERROR;
};
export type AutSignOutActionType = {
  type: typeof AUTH_SIGNOUT;
};

export type AuthAction = AuthStartActionType | AuthSuccessActionType | AuthFailureActionType;
