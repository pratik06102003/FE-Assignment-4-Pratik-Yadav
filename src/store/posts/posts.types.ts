import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import { Post } from '@app/posts';

export type PostsState = {
  posts: Post[];
  isCreating: boolean;
  isFetching: boolean;
  cursor: QueryDocumentSnapshot<DocumentData, DocumentData> | null;
  hasMore: boolean;
  postErrorMessage: string | null;
  postInfoMessage: string | null;
};

export const CREATE_POST_REQUEST = 'posts/CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'posts/CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'posts/CREATE_POST_FAILURE';

export const FETCH_POSTS_REQUEST = 'posts/FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE';
export const CLEAR_POSTS = 'posts/CLEAR_POSTS';

export type CreatePostRequestAction = {
  type: typeof CREATE_POST_REQUEST;
};

export type CreatePostSuccessAction = {
  type: typeof CREATE_POST_SUCCESS;
  payload: { post: Post; message: string };
};

export type CreatePostFailureAction = {
  type: typeof CREATE_POST_FAILURE;
  payload: { message: string };
};

export type FetchPostsRequestAction = { type: typeof FETCH_POSTS_REQUEST };
export type FetchPostsSuccessAction = {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: {
    posts: Post[];
    cursor: QueryDocumentSnapshot<DocumentData, DocumentData>;
    hasMore: boolean;
  };
};
export type FetchPostsFailureAction = {
  type: typeof FETCH_POSTS_FAILURE;
  payload: { message: string };
};

export type ClearPostsAction = {
  type: typeof CLEAR_POSTS;
};

export type PostsActionTypes =
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | FetchPostsRequestAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction
  | ClearPostsAction;
