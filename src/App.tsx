import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { notification } from 'antd';

import { useAppSelector } from '@store/root';
import { useAuth } from '@hooks/useAuth.hook';

import { router } from './routes/router';

export const App = () => {
  const { infoMessage, errorMessage } = useAppSelector((s) => s.messages);
  const [api, contextHolder] = notification.useNotification();
  const { listenService } = useAuth();

  useEffect(() => {
    if (errorMessage) api.error({ message: errorMessage });
    if (infoMessage) api.info({ message: infoMessage });
  }, [infoMessage, errorMessage, api]);

  useEffect(() => {
    const unsubscribe = listenService();
    return () => unsubscribe();
  }, [listenService]);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
};
