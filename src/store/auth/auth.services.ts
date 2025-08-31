import { FirebaseError } from 'firebase/app';

import { AppDispatch } from '@store/root/root.types';

import { authServices } from '../../app/auth/auth.services';
import { authError, authStart, authSuccess } from './auth.actions';
import { mapFirebaseError } from './auth.utils';

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dispatch: AppDispatch,
) => {
  dispatch(authStart());
  try {
    const user = await authServices.signup(firstName, lastName, email, password);
    dispatch(authSuccess(user, 'Signup Successful'));
  } catch (error) {
    if (error instanceof FirebaseError) {
      dispatch(authError(mapFirebaseError(error.code)));
    } else {
      dispatch(authError('Unexpected Error occurred'));
    }
  }
};

export const signout = async (dispatch: AppDispatch) => {
  dispatch(authStart());
  try {
    await authServices.signout();
    dispatch(authSuccess(null, 'Signout Successful'));
  } catch (error) {
    if (error instanceof FirebaseError) {
      dispatch(authError(mapFirebaseError(error.code)));
    } else {
      dispatch(authError('Unexpected Error occurred'));
    }
  }
};

export const listen = (dispatch: AppDispatch) => {
  dispatch(authStart());
  return authServices.listen((user) => (user ? dispatch(authSuccess(user)) : null));
};
