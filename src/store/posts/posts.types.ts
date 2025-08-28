import { Post } from '@app/posts/posts.type';

export type PostsState = {
  posts: Post[];
  ids: string[];
  isCreating: boolean;
  createError: string | null;
};

export const CREATE_POST_REQUEST = 'posts/CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'posts/CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'posts/CREATE_POST_FAILURE';

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

export type PostsActionTypes =
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction;
