import type {
  CollectionReference,
  DocumentReference,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit as limitFn,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import { firestore } from '@app/firebase';
import { FIRESTORE_COLLECTIONS } from '@constants/common.constant';
import { mapDocToPost } from '@utils/firebase';

import { FETCH_AUTHORS_CHUNK_SIZE } from './posts.constants';
import type {
  AuthorDocumentData,
  Post,
  PostCreatePayload,
  PostDocumentData,
  PostQueryParams,
  PostsPage,
  PostUpdatePayload,
} from './posts.type';

const postsCollection = () =>
  collection(firestore, FIRESTORE_COLLECTIONS.POSTS) as CollectionReference<PostDocumentData>;
const usersCollection = () =>
  collection(firestore, FIRESTORE_COLLECTIONS.USERS) as CollectionReference<AuthorDocumentData>;

export const createPost = async (authorId: string, payload: PostCreatePayload): Promise<Post> => {
  const payloadToSave = {
    ...payload,
    authorId,
    published: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = (await addDoc(
    postsCollection(),
    payloadToSave,
  )) as DocumentReference<PostDocumentData>;
  const snap = await getDoc(docRef);
  return mapDocToPost(snap);
};

const mapAuthorSnap = (snap: QueryDocumentSnapshot<AuthorDocumentData>) => {
  const data = snap.data();
  return {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
  };
};

export const fetchAuthors = async (
  authorIds: string[],
): Promise<Record<string, Post['author']>> => {
  if (authorIds.length === 0) return {};

  const result: Record<string, Post['author']> = {};

  for (let i = 0; i < authorIds.length; i += FETCH_AUTHORS_CHUNK_SIZE) {
    const chunk = authorIds.slice(i, i + FETCH_AUTHORS_CHUNK_SIZE);
    const authorsQuery = query(usersCollection(), where(documentId(), 'in', chunk));
    const authorsSnaps = await getDocs(authorsQuery);

    authorsSnaps.forEach((snap) => {
      result[snap.id] = mapAuthorSnap(snap);
    });
  }

  return result;
};

export const getPosts = async (params: PostQueryParams = {}): Promise<PostsPage> => {
  const {
    limit = 10,
    cursorId = null,
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

  if (cursorId) {
    const cursor = await getDoc(doc(firestore, FIRESTORE_COLLECTIONS.POSTS, cursorId));
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

  return { posts, nextCursorId: nextCursor?.id || null };
};

export const getPostById = async (postId: string): Promise<Post | null> => {
  const docRef = doc(
    firestore,
    FIRESTORE_COLLECTIONS.POSTS,
    postId,
  ) as DocumentReference<PostDocumentData>;
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
  const docRef = doc(
    firestore,
    FIRESTORE_COLLECTIONS.POSTS,
    postId,
  ) as DocumentReference<PostDocumentData>;
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  const snap = await getDoc(docRef);
  return mapDocToPost(snap);
};

export const deletePost = async (postId: string): Promise<void> => {
  const docRef = doc(firestore, FIRESTORE_COLLECTIONS.POSTS, postId);
  await updateDoc(docRef, {
    published: false,
    updatedAt: serverTimestamp(),
  });
};
