import type { User } from 'firebase/auth';

export type AuthUser = Pick<User, 'email' | 'uid'>;

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
};

export const AUTH_START = 'auth/START' as const;
export const AUTH_SUCCESS = 'auth/SUCCESS' as const;
export const AUTH_ERROR = 'auth/ERROR' as const;
export const AUTH_SIGNOUT = 'auth/SIGNOUT' as const;

export type AuthStartActionType = {
  type: typeof AUTH_START;
};
export type AuthSuccessActionType = {
  type: typeof AUTH_SUCCESS;
  payload: AuthUser | null;
};
export type AuthErrorActionType = {
  type: typeof AUTH_ERROR;
  payload: string;
};
export type AutSignOutActionType = {
  type: typeof AUTH_SIGNOUT;
};

export type AuthAction = AuthStartActionType | AuthSuccessActionType | AuthErrorActionType;
