import { Flex } from 'antd';

import type { SigninFormikValues } from '@components/SigninForm';
import { SigninForm } from '@components/SigninForm';
import { useAppSelector } from '@store/root';
import { useAuth } from '@hooks/useAuth.hook';

export const Signin = () => {
  const { signinService } = useAuth();
  const { loading } = useAppSelector((s) => s.auth);

  const handleSubmit = async ({ email, password }: SigninFormikValues) => {
    await signinService(email, password);
  };

  return (
    <Flex align="center" className="page">
      <SigninForm handleSubmit={handleSubmit} isLoading={loading} />
    </Flex>
  );
};
