import { Timestamp } from 'firebase/firestore';

import type { Post } from '@app/posts';

export const POST_REQUEST = 'posts/POST_REQUEST' as const;
export const POST_SUCCESS = 'posts/POST_SUCCESS' as const;
export const POST_FAILURE = 'posts/POST_FAILURE' as const;
export const ALL_POSTS_CLEAR = 'posts/ALL_POSTS_CLEAR' as const;
export const ALL_POSTS_SUCCESS = 'posts/ALL_POSTS_SUCCESS' as const;

export const DUMB_POST: Post = {
  authorDisplayName: '',
  authorId: '',
  content: '',
  createdAt: Timestamp.fromDate(new Date(0)),
  updatedAt: Timestamp.fromDate(new Date(0)),
  id: '',
  published: true,
  title: '',
  tags: [],
};
