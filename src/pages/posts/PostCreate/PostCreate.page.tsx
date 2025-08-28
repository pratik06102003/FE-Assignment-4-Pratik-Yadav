import { message } from 'antd';

import { FormikHelpers } from 'formik';

import { createPostFailure, createPostRequest, createPostSuccess } from '@store/posts/post.actions';
import { useAppDispatch, useAppSelector } from '@store/root';

import { CreatePostForm } from './components/CreatePostForm';
import { CreatePostValuesType } from './components/CreatePostForm/CreatePostForm.types';

import { PostInput, postsServices } from '@app/posts';

const PostCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCreating, createError } = useAppSelector((state) => state.post);
  const userId = useAppSelector((state) => state.auth.user?.uid);

  const handleSubmit = async (
    values: CreatePostValuesType,
    { resetForm }: FormikHelpers<CreatePostValuesType>,
  ) => {
    if (!userId) {
      message.error('You must be signed in to create a post');
      return;
    }

    const payload: PostInput = {
      title: values.title.trim(),
      content: values.content,
      tags: values.tags ? values.tags.split(',').map((t) => t.trim()) : [],
    };

    dispatch(createPostRequest());
    try {
      const post = await postsServices.createPost(payload, userId);
      dispatch(createPostSuccess(post));
      message.success('Post created');
      resetForm();
    } catch {
      dispatch(createPostFailure('Failed to create post'));
    }
  };

  return (
    <CreatePostForm handleSubmit={handleSubmit} isLoading={isCreating} errorMessage={createError} />
  );
};

export default PostCreate;
