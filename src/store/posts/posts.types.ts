import type { Post } from '@app/posts';

import type {
  ALL_POSTS_CLEAR,
  ALL_POSTS_SUCCESS,
  POST_FAILURE,
  POST_REQUEST,
  POST_SUCCESS,
} from './post.constants';

export type PostsState = {
  posts: Post[];
  post: Post;
  isLoading: boolean;
  lastFetchedDocumentId: string;
  hasMore: boolean;
};

export type PostRequestAction = {
  type: typeof POST_REQUEST;
};
export type PostSuccessAction = {
  type: typeof POST_SUCCESS;
  payload: { post: Post };
};
export type PostFailureAction = {
  type: typeof POST_FAILURE;
};

export type AllPostsSuccessAction = {
  type: typeof ALL_POSTS_SUCCESS;
  payload: {
    newPosts: Post[];
    lastFetchedDocumentId: string;
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
