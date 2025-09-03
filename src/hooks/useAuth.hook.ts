import { FirebaseError } from 'firebase/app';

<<<<<<< HEAD:src/hooks/useAuth.hook.ts
import { listen, signout, signup } from '@app/auth';
import { authFailure, authStart, authSuccess } from '@store/auth';
import { sendErrorMessage, sendInfoMessage } from '@store/messages';
=======
import { listen, resetPassword, signin, signout, signup } from '@app/auth';
>>>>>>> 82b3fb9 (YP_RU_03: Auth 2 - Signin: Restructured service):src/store/auth/auth.services.ts
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

  const signinService = async (email: string, password: string) => {
    dispatch(authStart());
    try {
      const user = await signin(email, password);
      dispatch(authSuccess(user, 'Sign in successful'));
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

  const resetPasswordService = async (email: string) => {
    dispatch(authStart());
    try {
      await resetPassword(email);
      dispatch(authSuccess(null, 'Password reset Email Sent'));
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(authError(mapFirebaseError(error.code)));
      } else {
        dispatch(authError('Unexpected Error occurred'));
      }
    }
  };

  return { signupService, signoutService, listenService, signinService, resetPasswordService };
};
