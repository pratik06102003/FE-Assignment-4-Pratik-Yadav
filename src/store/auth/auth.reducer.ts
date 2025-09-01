import type { AuthAction, AuthState } from './auth.types';
import { AUTH_ERROR, AUTH_START, AUTH_SUCCESS } from './auth.types';

const initialState: AuthState = {
  user: null,
  loading: true,
  errorMessage: null,
  infoMessage: null,
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, errorMessage: null, infoMessage: null };
    case AUTH_SUCCESS:
      return { ...state, loading: false, errorMessage: null, ...action.payload };
    case AUTH_ERROR:
      return { ...state, loading: false, infoMessage: null, ...action.payload };
    default:
      return state;
  }
};
