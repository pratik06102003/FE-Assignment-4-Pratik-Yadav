import { Flex } from 'antd';

import { ResetPasswordForm } from '@components/ResetPasswordForm';
import { useAppSelector } from '@store/root';
import { useAuth } from '@hooks/useAuth.hook';

import type { ResetPasswordFormikValues } from './ResetPassword.types';

export const ResetPassword = () => {
  const { loading } = useAppSelector((s) => s.auth);
  const { resetPasswordService } = useAuth();

  const handleSubmit = async (values: ResetPasswordFormikValues) => {
    await resetPasswordService(values.email);
  };

  return (
    <Flex align="center" className="page">
      <ResetPasswordForm handleSubmit={handleSubmit} isLoading={loading} />
    </Flex>
  );
};
