import { useNavigate } from 'react-router-dom';

import { FormikHelpers } from 'formik';

import { usePost } from '@store/posts/post.services';
import { useAppSelector } from '@store/root';

import { CreatePostForm } from '../CreatePost/components/CreatePostForm';
import { CreatePostValuesType } from '../CreatePost/components/CreatePostForm/CreatePostForm.types';

const PostEdit = () => {
  const { post, isLoading } = useAppSelector((state) => state.posts);
  const { updatePostService } = usePost();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: CreatePostValuesType,
    { resetForm }: FormikHelpers<CreatePostValuesType>,
  ) => {
    if (!post) return;

    await updatePostService(post.id, values);
    resetForm();
    await navigate(`/posts/${post.id}`);
  };

  return (
    <CreatePostForm
      onSubmit={handleSubmit}
      initialValues={post!}
      mode="edit"
      isLoading={isLoading}
    />
  );
};

export default PostEdit;
