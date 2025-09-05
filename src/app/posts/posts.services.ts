import {
  addDoc,
  collection,
  doc,
  DocumentData,
  documentId,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit as limitFn,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import {
  Post,
  PostCreatePayload,
  PostQueryParams,
  PostsPage,
  PostUpdatePayload,
} from './posts.type';

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

export const createPost = async (authorId: string, payload: PostCreatePayload): Promise<Post> => {
  const payloadToSave = {
    ...payload,
    authorId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(postsCollection(), payloadToSave);
  const snap = await getDoc(docRef);
  return mapDocToPost(snap);
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
    published = true,
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

  const authorIds = [...new Set(posts.map((p) => p.authorId))];
  const authors = await fetchAuthors(authorIds);

  posts.forEach((post) => {
    post.author = authors[post.authorId] ?? null;
  });

  return { posts, nextCursor };
};

export const getPostById = async (postId: string): Promise<Post | null> => {
  const docRef = doc(firestore, 'posts', postId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  const post = mapDocToPost(snap);
  if (!post.published) return null;
  return post;
};

export const getPostsByUser = async (
  userId: string,
  params: Omit<PostQueryParams, 'authorId'> = {},
): Promise<PostsPage> => getPosts({ ...params, authorId: userId });

export const updatePost = async (postId: string, updates: PostUpdatePayload): Promise<Post> => {
  const docRef = doc(firestore, 'posts', postId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  const snap = await getDoc(docRef);
  return mapDocToPost(snap);
};

export const deletePost = async (postId: string): Promise<void> => {
  const docRef = doc(firestore, 'posts', postId);
  await updateDoc(docRef, {
    published: false,
    updatedAt: serverTimestamp(),
  });
};
