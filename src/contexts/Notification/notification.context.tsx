import { createContext, useContext } from 'react';

import { notification } from 'antd';
import type { NotificationInstance } from 'antd/es/notification/interface';

import type { ReactNode } from 'react';

const NotificationContext = createContext<NotificationInstance | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationApi = (): NotificationInstance => {
  const api = useContext(NotificationContext);
  if (!api) {
    throw new Error('value prop missing in provider');
  }
  return api;
};
