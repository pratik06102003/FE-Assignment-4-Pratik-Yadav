import type { Post } from '@app/posts';

import {
  ALL_POSTS_CLEAR,
  ALL_POSTS_SUCCESS,
  POST_FAILURE,
  POST_REQUEST,
  POST_SUCCESS,
} from './post.constants';
import type {
  AllPostsClearAction,
  AllPostsSuccessAction,
  PostFailureAction,
  PostRequestAction,
  PostSuccessAction,
} from './posts.types';

export const postRequest = (): PostRequestAction => ({
  type: POST_REQUEST,
});

export const postSuccess = (post: Post): PostSuccessAction => ({
  type: POST_SUCCESS,
  payload: { post },
});

export const postFailure = (): PostFailureAction => ({
  type: POST_FAILURE,
});

export const allPostsSuccess = (
  newPosts: Post[],
  lastFetchedDocumentId: string,
  hasMore: boolean,
): AllPostsSuccessAction => ({
  type: ALL_POSTS_SUCCESS,
  payload: { newPosts, lastFetchedDocumentId, hasMore },
});

export const allPostsClear = (): AllPostsClearAction => ({
  type: ALL_POSTS_CLEAR,
});
