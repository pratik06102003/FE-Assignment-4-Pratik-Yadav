import { AUTH_ERROR, AUTH_START, AUTH_SUCCESS } from './auth.constants';
import type { AuthAction, AuthState } from './auth.types';

const initialState: AuthState = {
  user: null,
  loading: false,
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true };
    case AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload.user };
    case AUTH_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
