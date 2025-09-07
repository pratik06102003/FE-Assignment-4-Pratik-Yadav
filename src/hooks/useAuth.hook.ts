import { FirebaseError } from 'firebase/app';

import { listen, signout, signup } from '@app/auth';
import { authFailure, authStart, authSuccess } from '@store/auth';
import { sendErrorMessage, sendInfoMessage } from '@store/messages';
import { useAppDispatch } from '@store/root';

import { mapFirebaseError } from '@utils/firebase';

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
      dispatch(authSuccess(user));
      dispatch(sendInfoMessage('User Signup Successful'));
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(authFailure());
        dispatch(sendErrorMessage(mapFirebaseError(error.code)));
      } else {
        dispatch(authFailure());
        dispatch(sendErrorMessage(mapFirebaseError('Unexpected Error occurred')));
      }
    }
  };

  const signoutService = async () => {
    dispatch(authStart());
    try {
      await signout();
      dispatch(authSuccess(null));
      dispatch(sendInfoMessage('Signout Successful'));
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(authFailure());
        dispatch(sendErrorMessage(mapFirebaseError(error.code)));
      } else {
        dispatch(authFailure());
        dispatch(sendErrorMessage(mapFirebaseError('Unexpected Error occurred')));
      }
    }
  };

  return { signupService, signoutService, listenService };
};
