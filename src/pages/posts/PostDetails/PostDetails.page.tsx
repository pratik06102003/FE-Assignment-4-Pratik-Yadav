import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Post } from '@app/posts';
import { PostDetailCard } from '@components/PostDetailCard';
import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';
import { usePost } from '@hooks/usePost.hook';

import { DUMMY_POST } from './PostDetails.constants';

export const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const { fetchPostByIdService, deletePostByIdService, copyPostLinkService } = usePost();
  const { post, isLoading } = useAppSelector((s) => s.posts);
  const { user } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!post || post.id != postId) {
      void fetchPostByIdService(postId || '');
    }
  }, [post, postId, fetchPostByIdService]);

  const safePost: Post = post ?? DUMMY_POST;

  const handleDelete = useCallback(async () => {
    await deletePostByIdService(safePost.id);
    await navigate(ROUTES.HOME);
  }, [deletePostByIdService, navigate, safePost]);

  const handleEdit = useCallback(async () => {
    await navigate(`/posts/${safePost.id}/edit`);
  }, [navigate, safePost]);

  const handleShare = useCallback(async () => {
    await copyPostLinkService(safePost.id);
  }, [safePost, copyPostLinkService]);

  return (
    <PostDetailCard
      post={safePost}
      isLoading={isLoading}
      showAuthorActions={(user?.uid ?? '') == safePost.authorId}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onShare={handleShare}
    />
  );
};
