import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { FormikHelpers } from 'formik';

import type { PostValuesType } from '@components/PostForm';
import { PostForm } from '@components/PostForm';
import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';
import { usePost } from '@hooks/usePost.hook';

export const EditPost = () => {
  const { post, isLoading } = useAppSelector((state) => state.posts);
  const { fetchPostByIdService } = usePost();
  const { postId } = useParams();
  const { updatePostService } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    if ((!post || post.id != postId) && postId) {
      void fetchPostByIdService(postId);
    }
  }, [post, postId, fetchPostByIdService]);

  const handleSubmit = async (
    values: PostValuesType,
    { resetForm }: FormikHelpers<PostValuesType>,
  ) => {
    if (!post) return;

    await updatePostService(post.id, values);
    resetForm();
    await navigate(`/posts/${post.id}`);
  };

  const handleCancel = async () => {
    await navigate(ROUTES.HOME);
  };

  return (
    <PostForm
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      initialValues={post || {}}
      mode="edit"
      isLoading={isLoading}
    />
  );
};
