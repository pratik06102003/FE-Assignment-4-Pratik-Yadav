import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostDetailCard } from '@components/PostDetailCard';
import { useAppSelector } from '@store/root';
import { ROUTES } from '@constants/routes.constants';
import { usePost } from '@hooks/usePost.hook';

export const PostDetails = () => {
  const { postId = '' } = useParams<{ postId: string }>();
  const { fetchPostByIdService, deletePostByIdService, copyPostLinkService } = usePost();
  const { post, isLoading } = useAppSelector((s) => s.posts);
  const { user } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchPostByIdService(postId);
  }, [postId, fetchPostByIdService]);

  const handleDelete = useCallback(async () => {
    await deletePostByIdService(post.id);
    await navigate(ROUTES.HOME);
  }, [deletePostByIdService, navigate, post]);

  const handleEdit = useCallback(async () => {
    await navigate(`/posts/${post.id}/edit`);
  }, [navigate, post]);

  const handleShare = useCallback(async () => {
    await copyPostLinkService(post.id);
  }, [post, copyPostLinkService]);

  return (
    <PostDetailCard
      post={post}
      isLoading={isLoading}
      showAuthorActions={user.uid == post.authorId}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onShare={handleShare}
    />
  );
};
