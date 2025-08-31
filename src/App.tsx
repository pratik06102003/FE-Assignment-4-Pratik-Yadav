import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { listen } from '@store/auth/';
import { useAppDispatch } from '@store/root/root.hooks';

import { router } from './routes/router';

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = listen(dispatch);
    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};
