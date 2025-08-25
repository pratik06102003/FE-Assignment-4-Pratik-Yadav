import {
  AUTH_ERROR,
  AUTH_START,
  AUTH_SUCCESS,
  type AuthAction,
  type AuthState,
} from './auth.types';

const initial: AuthState = { user: null, loading: true, error: null };

export const authReducer = (state = initial, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, error: null };
    case AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case AUTH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
