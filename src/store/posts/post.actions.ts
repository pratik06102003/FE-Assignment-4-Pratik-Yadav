import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import {
  ALL_POSTS_CLEAR,
  ALL_POSTS_SUCCESS,
  type AllPostsClearAction,
  type AllPostsSuccessAction,
  POST_FAILURE,
  POST_REQUEST,
  POST_SUCCESS,
  type PostFailureAction,
  type PostRequestAction,
  type PostSuccessAction,
} from './posts.types';

import { Post } from '@app/posts';

export const postRequest = (): PostRequestAction => ({
  type: POST_REQUEST,
});

export const postSuccess = (post: Post | null, message: string): PostSuccessAction => ({
  type: POST_SUCCESS,
  payload: { post, message },
});

export const postFailure = (message: string): PostFailureAction => ({
  type: POST_FAILURE,
  payload: { message },
});

export const allPostsSuccess = (
  newPosts: Post[],
  cursor: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
  hasMore: boolean,
): AllPostsSuccessAction => ({
  type: ALL_POSTS_SUCCESS,
  payload: { newPosts, cursor, hasMore },
});

export const allPostsClear = (): AllPostsClearAction => ({
  type: ALL_POSTS_CLEAR,
});
