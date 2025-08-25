import { useAppSelector } from '@store/root/root.hooks';
import { Spin } from 'antd';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAppSelector((s) => s.auth);
  // alert(`${loading}, ${JSON.stringify(user, null, 2)}`);

  if (loading) {
    return <Spin fullscreen />;
  } else if (!user) {
    return <Navigate to="/auth/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
