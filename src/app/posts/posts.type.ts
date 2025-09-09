import type { Timestamp } from 'firebase/firestore';

export type Post = {
  id: string;
  authorId: string;
  author: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  title: string;
  content: string;
  tags?: string[];
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type PostDocumentData = Omit<Post, 'id' | 'author'>;

export type PostCreatePayload = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'author'>;
export type PostUpdatePayload = Partial<Omit<Post, 'id' | 'authorId' | 'createdAt' | 'updatedAt'>>;

export type PostQueryParams = Partial<{
  limit: number;
  cursorId: string | null;
  authorId: string;
  tags: string[];
  published: boolean;
  orderByField: string;
  order: 'asc' | 'desc';
  titlePrefix: string;
}>;

export type PostsPage = {
  posts: Post[];
  nextCursorId: string | null;
};

export type AuthorDocumentData = {
  email: string;
  firstName: string;
  lastName: string;
};
