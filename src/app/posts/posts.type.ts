import { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';

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
  published?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type PostCreatePayload = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'author'>;
export type PostUpdatePayload = Partial<Omit<Post, 'id' | 'authorId' | 'createdAt' | 'updatedAt'>>;

export type PostQueryParams = {
  limit?: number;
  cursor?: QueryDocumentSnapshot<DocumentData> | null;
  authorId?: string;
  tags?: string[];
  published?: boolean;
  orderByField?: string;
  order?: 'asc' | 'desc';
  titlePrefix?: string;
};

export type PostsPage = {
  posts: Post[];
  nextCursor: QueryDocumentSnapshot<DocumentData> | null;
};
