import { useNavigate } from 'react-router-dom';

import type { FormikHelpers } from 'formik';

import type { PostCreatePayload } from '@app/posts';
import type { PostValuesType } from '@components/PostForm';
import { PostForm } from '@components/PostForm';
import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';
import { usePost } from '@hooks/usePost.hook';

export const CreatePost = () => {
  const { createPostService } = usePost();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.posts);
  const userId = useAppSelector((state) => state.auth.user?.uid);

  const handleSubmit = async (
    values: PostValuesType,
    { resetForm }: FormikHelpers<PostValuesType>,
  ) => {
    const payload: PostCreatePayload = {
      authorId: userId || '',
      title: values.title,
      content: values.content,
      tags: values.tags,
      published: true,
    };

    await createPostService(userId || '', payload);
    resetForm();
    await navigate(ROUTES.BLOGS);
  };

  const handleCancel = async () => {
    await navigate(ROUTES.HOME);
  };

  return <PostForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />;
};
