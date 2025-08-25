import { useDispatch } from 'react-redux';

import { Button, Typography } from 'antd';

import { signOut } from '@store/auth';

const PostsIndex = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => void signOut(dispatch)}>SignOut</Button>
      <Typography.Title>All Posts</Typography.Title>
    </>
  );
};

export default PostsIndex;
