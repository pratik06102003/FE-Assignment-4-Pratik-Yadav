import { useNavigate } from 'react-router-dom';

import { Spin } from 'antd';

import { isEqual } from 'lodash';

import { DUMB_USER } from '@store/auth/auth.constants';
import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';

import type { ProtectedRoutesProps } from './ProtectedRoute.types';

export const ProtectedRoute = (props: ProtectedRoutesProps) => {
  const { children } = props;
  const { user, loading } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  if (!loading && isEqual(user, DUMB_USER)) {
    void navigate(ROUTES.SIGNIN, { replace: true });
  }

  return loading ? <Spin fullscreen /> : children;
};
