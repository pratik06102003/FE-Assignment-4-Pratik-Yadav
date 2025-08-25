import { FirebaseError } from 'firebase/app';

import { AppDispatch } from '@store/root/root.types';

import { authServices } from '../../app/auth/auth.services';
import { authError, authStart, authSuccess } from './auth.actions';
import { mapFirebaseError } from './auth.utils';

export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dispatch: AppDispatch,
) => {
  dispatch(authStart());
  try {
    const user = await authServices.signUp(firstName, lastName, email, password);
    dispatch(authSuccess(user));
  } catch (error) {
    if (error instanceof FirebaseError) {
      dispatch(authError(mapFirebaseError(error.code)));
    } else {
      dispatch(authError('Unexpected Error occurred'));
    }
  }
};

export const signOut = async (dispatch: AppDispatch) => {
  dispatch(authStart());
  try {
    await authServices.signOut();
    dispatch(authSuccess(null));
  } catch (error) {
    if (error instanceof FirebaseError) {
      dispatch(authError(mapFirebaseError(error.code)));
    } else {
      dispatch(authError('Unexpected Error occurred'));
    }
  }
};
