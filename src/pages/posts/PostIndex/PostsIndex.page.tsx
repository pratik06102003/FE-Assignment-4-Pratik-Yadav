import { Button, Typography } from 'antd';

import { useAuth } from '@store/auth';

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
