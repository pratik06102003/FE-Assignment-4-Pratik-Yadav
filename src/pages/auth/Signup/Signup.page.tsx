import { useEffect } from 'react';

import { Flex } from 'antd';

import type { SignupFormikValues } from '@components/SignupForm';
import { SignupForm } from '@components/SignupForm';
import { useAuth } from '@store/auth';
import { useAppSelector } from '@store/root';
import { useNotificationApi } from '@contexts/Notification';

export const Signup = () => {
  const { signupService } = useAuth();
  const { loading, errorMessage, infoMessage } = useAppSelector((s) => s.auth);
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

  const handleSubmit = async ({ firstName, lastName, email, password }: SignupFormikValues) => {
    await signupService(firstName, lastName, email, password);
  };

  return (
    <Flex align="center" className="page">
      <SignupForm handleSubmit={handleSubmit} isLoading={loading} />
    </Flex>
  );
};
