import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import { Post } from '@app/posts';

export type PostsState = {
  posts: Post[];
  post: Post | null;
  isLoading: boolean;
  cursor: QueryDocumentSnapshot<DocumentData, DocumentData> | null;
  hasMore: boolean;
  errorMessage: string | null;
  infoMessage: string | null;
};

export const POST_REQUEST = 'posts/POST_REQUEST';
export const POST_SUCCESS = 'posts/POST_SUCCESS';
export const POST_FAILURE = 'posts/POST_FAILURE';
export const ALL_POSTS_CLEAR = 'posts/ALL_POSTS_CLEAR';
export const ALL_POSTS_SUCCESS = 'posts/ALL_POSTS_SUCCESS';

export type PostRequestAction = {
  type: typeof POST_REQUEST;
};
export type PostSuccessAction = {
  type: typeof POST_SUCCESS;
  payload: { post: Post | null; message: string };
};
export type PostFailureAction = {
  type: typeof POST_FAILURE;
  payload: { message: string };
};

export type AllPostsSuccessAction = {
  type: typeof ALL_POSTS_SUCCESS;
  payload: {
    newPosts: Post[];
    cursor: QueryDocumentSnapshot<DocumentData, DocumentData> | null;
    hasMore: boolean;
  };
};

export type AllPostsClearAction = {
  type: typeof ALL_POSTS_CLEAR;
};

export type PostsActionTypes =
  | PostRequestAction
  | PostFailureAction
  | PostSuccessAction
  | AllPostsClearAction
  | AllPostsSuccessAction;
