import { useCallback } from 'react';

import { FirebaseError } from 'firebase/app';

import { useAppDispatch } from '@store/root';

import {
  allPostsClear,
  allPostsSuccess,
  postFailure,
  postRequest,
  postSuccess,
} from './post.actions';

import { deletePost, getPostById, getPosts, updatePost } from '@app/posts';
import { PostQueryParams, PostsPage, PostUpdatePayload } from '@app/posts/posts.type';
import { mapFirebaseError } from '@utils/firebase.utils';

export const usePost = () => {
  const dispatch = useAppDispatch();

  const fetchPostService = useCallback(
    async (params: PostQueryParams) => {
      dispatch(postRequest());
      try {
        const page: PostsPage = await getPosts({ ...params });
        dispatch(allPostsSuccess(page.posts, page.nextCursor, !!page.nextCursor));
      } catch (error) {
        if (error instanceof FirebaseError) {
          dispatch(postFailure(mapFirebaseError(error.code)));
        } else {
          dispatch(postFailure('Unexpected Error occurred'));
        }
      }
    },
    [dispatch],
  );

  const fetchPostByIdService = useCallback(
    async (postId: string) => {
      dispatch(postRequest());
      try {
        const post = await getPostById(postId);
        if (!post) dispatch(postFailure('No such post exist'));
        else dispatch(postSuccess(post, 'Post Fetched'));
      } catch (error) {
        if (error instanceof FirebaseError) {
          dispatch(postFailure(mapFirebaseError(error.code)));
        } else {
          dispatch(postFailure('Unexpected Error occurred'));
        }
      }
    },
    [dispatch],
  );

  const filterPostService = useCallback(
    async (params: PostQueryParams) => {
      dispatch(allPostsClear());
      dispatch(postRequest());
      try {
        const page: PostsPage = await getPosts({ ...params });
        dispatch(allPostsSuccess(page.posts, page.nextCursor, !!page.nextCursor));
      } catch (error) {
        if (error instanceof FirebaseError) {
          dispatch(postFailure(mapFirebaseError(error.code)));
        } else {
          dispatch(postFailure('Unexpected Error occurred'));
        }
      }
    },
    [dispatch],
  );

  const deletePostByIdService = useCallback(
    async (postId: string) => {
      dispatch(postRequest());
      try {
        await deletePost(postId);
        dispatch(postSuccess(null, 'Post Deleted'));
      } catch (error) {
        if (error instanceof FirebaseError) {
          dispatch(postFailure(mapFirebaseError(error.code)));
        } else {
          dispatch(postFailure('Unexpected Error occurred'));
        }
      }
    },
    [dispatch],
  );

  const updatePostService = useCallback(
    async (postId: string, updates: PostUpdatePayload) => {
      dispatch(allPostsClear());
      dispatch(postRequest());
      try {
        const post = await updatePost(postId, updates);
        dispatch(postSuccess(post, 'Post Updated'));
      } catch (error) {
        if (error instanceof FirebaseError) {
          dispatch(postFailure(mapFirebaseError(error.code)));
        } else {
          dispatch(postFailure('Unexpected Error occurred'));
        }
      }
    },
    [dispatch],
  );

  return {
    fetchPostService,
    fetchPostByIdService,
    deletePostByIdService,
    filterPostService,
    updatePostService,
  };
};
