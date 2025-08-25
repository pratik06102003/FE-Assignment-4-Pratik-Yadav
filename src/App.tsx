<<<<<<< HEAD
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';

export const App = () => <RouterProvider router={router} />;
=======
import { useAppDispatch } from '@store/root/root.hooks';
import { router } from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { authStart, authSuccess } from '@store/auth/auth.actions';
import { authServices } from './app/auth/';

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authStart());
    const unsubscribe = authServices.listen((u) => dispatch(authSuccess(u)));
    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)
