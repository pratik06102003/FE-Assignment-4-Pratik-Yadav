import React, { useCallback, useEffect, useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Timestamp } from 'firebase/firestore';

import { PostDetailCard } from '@components/PostDetailCard';
import { usePost } from '@store/posts/post.services';
import { useAppSelector } from '@store/root';

import type { Post } from '@app/posts';

const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const { fetchPostByIdService, deletePostByIdService } = usePost();
  const { post, isLoading } = useAppSelector((s) => s.posts);
  const { user } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) return;
    if (post?.id !== postId) {
      void fetchPostByIdService(postId);
    }
  }, [postId, fetchPostByIdService, post?.id]);

  const handleDelete = useCallback(
    async (id: string) => {
      await deletePostByIdService(id);
      await navigate('/');
    },
    [deletePostByIdService, navigate],
  );

  const handleEdit = useCallback(
    async (id: string) => {
      await navigate(`/posts/${id}/edit`);
    },
    [navigate],
  );

  const safePost: Post = useMemo(
    () =>
      post ??
      ({
        id: postId ?? '',
        title: '',
        content: '',
        tags: [],
        author: { firstName: '', lastName: '', email: '' },
        authorId: '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      } as Post),
    [post, postId],
  );

  return (
    <PostDetailCard
      post={safePost}
      isLoading={isLoading}
      userId={user?.uid ?? ''}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
};

export default PostDetails;
