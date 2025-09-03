import { useEffect } from 'react';

import { Flex } from 'antd';

import { useAuth } from '@store/auth';
import { useAppSelector } from '@store/root';

import type { SigninFormikValues } from './SigninForm';
import { SigninForm } from './SigninForm';

import './Signin.styles.scss';
import { useNotificationApi } from '@contexts/Notification';

export const Signin = () => {
  const { signinService } = useAuth();
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

  const handleSubmit = async ({ email, password }: SigninFormikValues) => {
    await signinService(email, password);
  };

  return (
    <>
      <Flex align="center" className="signin">
        <SigninForm handleSubmit={handleSubmit} isLoading={loading} />
      </Flex>
    </>
  );
};
