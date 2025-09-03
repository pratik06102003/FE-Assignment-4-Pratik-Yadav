import { useEffect } from 'react';

import { Flex } from 'antd';

import { useAuth } from '@store/auth';
import { useAppSelector } from '@store/root';

import { ResetPasswordForm } from './ResetPasswordForm/ResetPasswordForm.component';
import type { ResetPasswordFormikValues } from './ResetPassword.types';

import { useNotificationApi } from '@contexts/Notification';

export const ResetPassword = () => {
  const { loading, errorMessage, infoMessage } = useAppSelector((s) => s.auth);
  const { resetPasswordService } = useAuth();

  const api = useNotificationApi();

  useEffect(() => {
    if (errorMessage) {
      api.error({
        message: 'Hold on, something is wrong !!',
        description: errorMessage,
        placement: 'topLeft',
      });
    }
    if (infoMessage) {
      api.info({
        message: 'Here you go',
        description: infoMessage,
        placement: 'topLeft',
      });
    }
  }, [errorMessage, infoMessage, api]);

  const handleSubmit = async (values: ResetPasswordFormikValues) => {
    await resetPasswordService(values.email);
  };

  return (
    <Flex align="center" style={{ height: '100%' }}>
      <ResetPasswordForm handleSubmit={handleSubmit} isLoading={loading} />
    </Flex>
  );
};
