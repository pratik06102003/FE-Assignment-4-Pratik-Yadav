import {
  addDoc,
  collection,
  DocumentData,
  documentId,
  DocumentSnapshot,
  getDocs,
  limit as limitFn,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';

import { Post, PostCreatePayload, PostQueryParams, PostsPage } from './posts.type';

import { firestore } from '@app/index';

const postsCollection = () => collection(firestore, 'posts');
const usersCollection = () => collection(firestore, 'users');

function mapDocToPost(docSnap: DocumentSnapshot<DocumentData>): Post {
  if (!docSnap.exists()) {
    throw new Error(`Document with id ${docSnap.id} does not exist`);
  }

  const raw = docSnap.data();
  return {
    id: docSnap.id,
    authorId: raw.authorId as string,
    author: null,
    title: raw.title as string,
    content: raw.content as string,
    tags: (raw.tags as string[]) ?? [],
    published: typeof raw.published === 'boolean' ? raw.published : true,
    createdAt: (raw.createdAt as Timestamp) ?? null,
    updatedAt: (raw.updatedAt as Timestamp) ?? null,
  };
}

export const createPost = async (authorId: string, payload: PostCreatePayload): Promise<void> => {
  const payloadToSave = {
    ...payload,
    authorId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await addDoc(postsCollection(), payloadToSave);
};

export const fetchAuthors = async (
  authorIds: string[],
): Promise<Record<string, Post['author']>> => {
  if (authorIds.length === 0) return {};

  const chunkSize = 10;
  const result: Record<string, Post['author']> = {};

  for (let i = 0; i < authorIds.length; i += chunkSize) {
    const chunk = authorIds.slice(i, i + chunkSize);
    const uq = query(usersCollection(), where(documentId(), 'in', chunk));
    const uSnap = await getDocs(uq);

    uSnap.forEach((uDoc) => {
      const data = uDoc.data();
      result[uDoc.id] = {
        email: data.email as string,
        firstName: data.firstName as string,
        lastName: data.lastName as string,
      };
    });
  }

  return result;
};

export const getPosts = async (params: PostQueryParams = {}): Promise<PostsPage> => {
  const {
    limit = 10,
    cursor = null,
    authorId,
    tags,
    published,
    orderByField = 'createdAt',
    order = 'desc',
    titlePrefix,
  } = params;

  let q = query(postsCollection());

  if (authorId) {
    q = query(q, where('authorId', '==', authorId));
  }

  if (typeof published === 'boolean') {
    q = query(q, where('published', '==', published));
  }

  if (tags && tags.length > 0) {
    q = query(q, where('tags', 'array-contains-any', tags.slice(0, 10)));
  }

  if (titlePrefix && titlePrefix.trim() !== '') {
    const start = titlePrefix;
    const end = titlePrefix + '\uf8ff';
    q = query(q, where('title', '>=', start), where('title', '<=', end));
  }

  q = query(q, orderBy(orderByField, order));

  q = query(q, limitFn(limit));

  if (cursor) {
    q = query(q, startAfter(cursor));
  }

  const snap = await getDocs(q);
  const posts = snap.docs.map(mapDocToPost);
  const nextCursor = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

  // hydrate author info
  const authorIds = [...new Set(posts.map((p) => p.authorId))];
  const authors = await fetchAuthors(authorIds);

  posts.forEach((post) => {
    post.author = authors[post.authorId] ?? null;
  });

  return { posts, nextCursor };
};
