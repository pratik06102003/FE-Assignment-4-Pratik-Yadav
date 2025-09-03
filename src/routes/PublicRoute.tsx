import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      void navigate(ROUTES.HOME, { replace: true });
    }
  }, [user, loading, navigate]);

  return children;
};
