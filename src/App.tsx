import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAuth } from '@store/auth/';

import { router } from './routes/router';

import { NotificationProvider } from '@contexts/Notification/notification.context';

export const App = () => {
  const { listenService } = useAuth();
  listenService();
  useEffect(() => {
    const unsubscribe = listenService();
    return () => unsubscribe();
  }, [listenService]);

  return (
    <NotificationProvider>
      <RouterProvider router={router} />;
    </NotificationProvider>
  );
};
