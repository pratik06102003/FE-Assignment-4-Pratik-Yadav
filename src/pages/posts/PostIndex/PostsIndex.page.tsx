import { Button, Typography } from 'antd';

import { useDispatch } from 'react-redux';

import { signout } from '@store/auth';

const { Title } = Typography;
const PostsIndex = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => void signout(dispatch)}>SignOut</Button>
      <Title>All Posts</Title>
    </>
  );
};

export default PostsIndex;
