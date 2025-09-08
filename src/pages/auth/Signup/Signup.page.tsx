import { Flex } from 'antd';

import type { SignupFormikValues } from '@components/SignupForm';
import { SignupForm } from '@components/SignupForm';
import { useAppSelector } from '@store/root';
import { useAuth } from '@hooks/useAuth.hook';

export const Signup = () => {
  const { signupService } = useAuth();
  const { loading } = useAppSelector((s) => s.auth);

  const handleSubmit = async ({ firstName, lastName, email, password }: SignupFormikValues) => {
    await signupService(firstName, lastName, email, password);
  };

  return (
    <Flex align="center" className="page">
      <SignupForm handleSubmit={handleSubmit} isLoading={loading} />
    </Flex>
  );
};
