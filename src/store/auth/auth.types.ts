import type { User } from 'firebase/auth';

export type AuthUser = Pick<User, 'email' | 'uid'>;

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  errorMessage: string | null;
  infoMessage: string | null;
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
  payload: { user: AuthUser | null; infoMessage?: string };
};
export type AuthErrorActionType = {
  type: typeof AUTH_ERROR;
  payload: { errorMessage: string };
};
export type AutSignOutActionType = {
  type: typeof AUTH_SIGNOUT;
};

export type AuthAction = AuthStartActionType | AuthSuccessActionType | AuthErrorActionType;
