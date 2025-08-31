import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAppSelector((s) => s.auth);

  if (loading) {
    return <Spin fullscreen />;
  } else if (!user) {
    return <Navigate to={ROUTES.SIGNUP} replace />;
  }

  return children;
};

export default ProtectedRoute;
