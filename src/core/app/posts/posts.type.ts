import type { Timestamp } from 'firebase/firestore';

export type Post = {
  id: string;
  authorId: string;
  authorDisplayName: string;
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
  lastFetchedDocumentId: string | null;
  authorId: string;
  tags: string[];
  published: boolean;
  orderByField: string;
  order: 'asc' | 'desc';
  titlePrefix: string;
}>;

export type PostsPage = {
  posts: Post[];
  nextLastFetchedDocumentId: string;
};

export type AuthorDocumentData = {
  email: string;
  firstName: string;
  lastName: string;
};
