import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';

export const AuthRoute = (props: { children: ReactNode }) => {
  const { children } = props;
  const { user, loading } = useAppSelector((s) => s.auth);

  if (loading) return <Spin fullscreen />;
  if (user) return <Navigate to={ROUTES.HOME} replace />;

  return children;
};
