import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import {
  CLEAR_POSTS,
  ClearPostsAction,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CreatePostFailureAction,
  CreatePostRequestAction,
  CreatePostSuccessAction,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FetchPostsFailureAction,
  FetchPostsRequestAction,
  FetchPostsSuccessAction,
} from './posts.types';

import { Post } from '@app/posts';

export const createPostRequest = (): CreatePostRequestAction => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (post: Post, message: string): CreatePostSuccessAction => ({
  type: CREATE_POST_SUCCESS,
  payload: { post, message },
});

export const createPostFailure = (message: string): CreatePostFailureAction => ({
  type: CREATE_POST_FAILURE,
  payload: { message },
});

export const fetchPostsRequest = (): FetchPostsRequestAction => ({ type: FETCH_POSTS_REQUEST });

export const fetchPostsSuccess = (
  posts: Post[],
  cursor: QueryDocumentSnapshot<DocumentData, DocumentData>,
  hasMore: boolean,
): FetchPostsSuccessAction => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts, cursor, hasMore },
});

export const fetchPostsFailure = (message: string): FetchPostsFailureAction => ({
  type: FETCH_POSTS_FAILURE,
  payload: { message },
});

export const clearPosts = (): ClearPostsAction => ({
  type: CLEAR_POSTS,
});
