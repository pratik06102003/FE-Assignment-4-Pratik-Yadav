import { FirebaseError } from 'firebase/app';

import { listen, signout, signup } from '@app/auth';
import { useAppDispatch } from '@store/root';

import { authError, authStart, authSuccess } from './auth.actions';
import { mapFirebaseError } from './auth.utils';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const listenService = () => {
    dispatch(authStart());
    return listen((user) => dispatch(authSuccess(user)));
  };

  const signupService = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    dispatch(authStart());
    try {
      const user = await signup(firstName, lastName, email, password);
      dispatch(authSuccess(user, 'Signup Successful'));
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(authError(mapFirebaseError(error.code)));
      } else {
        dispatch(authError('Unexpected Error occurred'));
      }
    }
  };

  const signoutService = async () => {
    dispatch(authStart());
    try {
      await signout();
      dispatch(authSuccess(null, 'Signout Successful'));
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(authError(mapFirebaseError(error.code)));
      } else {
        dispatch(authError('Unexpected Error occurred'));
      }
    }
  };

  return { signupService, signoutService, listenService };
};
