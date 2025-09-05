import { Post } from '@app/posts';

export type PostDetailCardProps = {
  post: Post;
  isLoading: boolean;
  userId: string;
  onEdit: (postId: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
};
