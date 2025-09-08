import { Button, Typography } from 'antd';

import { useAuth } from '@hooks/useAuth.hook';

const { Title } = Typography;
const PostsIndex = () => {
  const { signoutService } = useAuth();

  return (
    <>
      <Button onClick={() => void signoutService()}>SignOut</Button>
      <Title>All Posts</Title>
    </>
  );
};

export default PostsIndex;
