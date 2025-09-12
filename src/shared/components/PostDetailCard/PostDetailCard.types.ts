import type { Post } from '@app/posts';

export type PostDetailCardProps = {
  post: Post;
  isLoading: boolean;
  showAuthorActions: boolean;
  onEdit: () => Promise<void>;
  onDelete: () => Promise<void>;
  onShare: () => Promise<void>;
};
