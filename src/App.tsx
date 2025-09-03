import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAuth } from '@store/auth/';
import { NotificationProvider } from '@contexts/Notification/notification.context';

import { router } from './routes/router';

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
