import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CreatePostFailureAction,
  CreatePostRequestAction,
  CreatePostSuccessAction,
} from './posts.types';

import { Post } from '@app/posts';

export const createPostRequest = (): CreatePostRequestAction => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (post: Post): CreatePostSuccessAction => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (message: string): CreatePostFailureAction => ({
  type: CREATE_POST_FAILURE,
  payload: { message },
});
