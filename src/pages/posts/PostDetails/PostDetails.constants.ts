import { Timestamp } from 'firebase/firestore';

import type { Post } from '@app/posts';

export const DUMMY_POST = {
  id: '',
  title: '',
  content: '',
  tags: [],
  author: { firstName: '', lastName: '', email: '' },
  authorId: '',
  published: false,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
} as Post;
