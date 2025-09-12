import type { Post } from '@app/posts';

export type PostListProps = {
  posts: Post[];
  isLoading: boolean;
  onOpenPost: (postId: string) => Promise<void>;
  hasMore: boolean;
};
