import type { CollectionReference, DocumentReference } from 'firebase/firestore';
import {
  addDoc,
  collection,
  doc,
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

import type {
  Post,
  PostCreatePayload,
  PostDocumentData,
  PostQueryParams,
  PostsPage,
  PostUpdatePayload,
} from './posts.type';

const postsCollection = () =>
  collection(firestore, FIRESTORE_COLLECTIONS.POSTS) as CollectionReference<PostDocumentData>;

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

export const getPosts = async (params: PostQueryParams = {}): Promise<PostsPage> => {
  const {
    limit = 10,
    lastFetchedDocumentId = null,
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

  q = query(q, where('published', '==', published));

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

  if (lastFetchedDocumentId) {
    const cursor = await getDoc(doc(firestore, FIRESTORE_COLLECTIONS.POSTS, lastFetchedDocumentId));
    q = query(q, startAfter(cursor));
  }

  const snap = await getDocs(q);
  const posts = snap.docs.map(mapDocToPost);
  const lastFetchedDocument = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

  return { posts, nextLastFetchedDocumentId: lastFetchedDocument?.id || '' };
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
