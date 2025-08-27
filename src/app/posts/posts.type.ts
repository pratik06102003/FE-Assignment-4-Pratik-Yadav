import type { FieldValue, Timestamp } from 'firebase/firestore';
export type Post = {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  authorId: string;
  createdAt: FieldValue | Timestamp;
  updatedAt?: FieldValue | Timestamp;
};

export type PostInput = Pick<Post, 'title' | 'content' | 'tags'>;
