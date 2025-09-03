import { Post } from '@app/posts';

export type PostCardProps = {
  post: Post;
  onOpen?: (postId: string) => void;
};
