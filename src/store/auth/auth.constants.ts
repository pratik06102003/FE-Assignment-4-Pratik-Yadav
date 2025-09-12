import type { User } from '@app/auth';

export const AUTH_START = 'auth/START' as const;
export const AUTH_SUCCESS = 'auth/SUCCESS' as const;
export const AUTH_ERROR = 'auth/ERROR' as const;
export const AUTH_SIGNOUT = 'auth/SIGNOUT' as const;

export const DUMB_USER: User = {
  displayName: '',
  email: '',
  uid: '',
};
