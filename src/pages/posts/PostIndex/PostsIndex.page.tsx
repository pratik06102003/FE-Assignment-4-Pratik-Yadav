<<<<<<< HEAD
import { Typography } from 'antd';

const PostsIndex = () => <Typography.Title>All Posts</Typography.Title>;
=======
import { signOut } from '@store/auth';
import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';

const PostsIndex = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => void signOut(dispatch)}>SignOut</Button>
      <Typography.Title>All Posts</Typography.Title>
    </>
  );
};
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)

export default PostsIndex;
