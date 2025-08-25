import { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { authStart, authSuccess } from '@store/auth/auth.actions';
import { useAppDispatch } from '@store/root/root.hooks';

import { authServices } from './app/auth/';
import { router } from './routes/router';

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authStart());
    const unsubscribe = authServices.listen((u) => dispatch(authSuccess(u)));
    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};
