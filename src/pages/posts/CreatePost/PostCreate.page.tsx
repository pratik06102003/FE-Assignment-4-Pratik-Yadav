import { message } from 'antd';

import { FormikHelpers } from 'formik';

import { postFailure, postRequest, postSuccess } from '@store/posts/post.actions';
import { useAppDispatch, useAppSelector } from '@store/root';

import { CreatePostForm } from './components/CreatePostForm';
import { CreatePostValuesType } from './components/CreatePostForm/CreatePostForm.types';

import { PostCreatePayload } from '@app/posts';
import { createPost } from '@app/posts/posts.services';

const PostCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.posts);
  const userId = useAppSelector((state) => state.auth.user?.uid);

  const handleSubmit = async (
    values: CreatePostValuesType,
    { resetForm }: FormikHelpers<CreatePostValuesType>,
  ) => {
    if (!userId) {
      message.error('You must be signed in to create a post');
      return;
    }

    const payload: PostCreatePayload = {
      authorId: userId,
      title: values.title.trim(),
      content: values.content,
      tags: values.tags,
    };

    dispatch(postRequest());
    try {
      const post = await createPost(userId, payload);
      dispatch(postSuccess(post, 'Post Created!!'));
      resetForm();
    } catch {
      dispatch(postFailure('Failed to create post'));
    }
  };

  return <CreatePostForm onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default PostCreate;
