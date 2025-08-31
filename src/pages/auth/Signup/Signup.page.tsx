import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, notification } from 'antd';

import { signup } from '@store/auth';
import { useAppDispatch, useAppSelector } from '@store/root';

import { SignupForm, SignupFormikValues } from './SignupForm';

import './Signup.styles.scss';

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, errorMessage, user, infoMessage } = useAppSelector((s) => s.auth);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (user) {
      void navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (errorMessage) {
      api.error({
        message: 'Hold on, something is wrong',
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
    await signup(firstName, lastName, email, password, dispatch);
  };

  return (
    <>
      <Flex align="center" className="signup">
        {contextHolder}
        <SignupForm handleSubmit={handleSubmit} isLoading={loading} />
      </Flex>
    </>
  );
};
export default Signup;
