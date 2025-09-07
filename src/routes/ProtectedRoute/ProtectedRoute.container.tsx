import { useNavigate } from 'react-router-dom';

import { Spin } from 'antd';

import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';

import type { ProtectedRoutesProps } from './ProtectedRoute.types';

export const ProtectedRoute = (props: ProtectedRoutesProps) => {
  const { children } = props;
  const { user, loading } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  if (!loading && !user) {
    void navigate(ROUTES.SIGNIN);
  }

  return loading ? <Spin fullscreen /> : children;
};
