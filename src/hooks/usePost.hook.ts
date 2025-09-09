import { useCallback } from 'react';

import { FirebaseError } from 'firebase/app';

import type { PostCreatePayload, PostQueryParams, PostsPage, PostUpdatePayload } from '@app/posts';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '@app/posts';
import { sendErrorMessage, sendInfoMessage } from '@store/messages';
import {
  allPostsClear,
  allPostsSuccess,
  postFailure,
  postRequest,
  postSuccess,
} from '@store/posts';
import { useAppDispatch } from '@store/root';
import { mapFirebaseError } from '@utils/firebase';

export const usePost = () => {
  const dispatch = useAppDispatch();

  const createPostService = useCallback(
    async (userId: string, payload: PostCreatePayload) => {
      dispatch(postRequest());
      try {
        const post = await createPost(userId, payload);
        dispatch(postSuccess(post));
        dispatch(sendInfoMessage('Post Created!!'));
      } catch (error) {
        dispatch(postFailure());
        if (error instanceof FirebaseError) {
          dispatch(sendErrorMessage(mapFirebaseError(error.code)));
          dispatch(postFailure());
        } else {
          dispatch(sendErrorMessage('Unexpected Error occurred'));
        }
      }
    },
    [dispatch],
  );
  const fetchPostService = useCallback(
    async (params: PostQueryParams) => {
      dispatch(postRequest());
      try {
        const page: PostsPage = await getPosts({ ...params });
        dispatch(allPostsSuccess(page.posts, page.nextCursorId, !!page.nextCursorId));
      } catch (error) {
        dispatch(postFailure());
        if (error instanceof FirebaseError) {
          dispatch(sendErrorMessage(mapFirebaseError(error.code)));
          dispatch(postFailure());
        } else {
          dispatch(sendErrorMessage('Unexpected Error occurred'));
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
        dispatch(postSuccess(post));
      } catch (error) {
        dispatch(postFailure());
        if (error instanceof FirebaseError) {
          dispatch(sendErrorMessage(mapFirebaseError(error.code)));
          dispatch(postFailure());
        } else {
          dispatch(sendErrorMessage('Unexpected Error occurred'));
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
        dispatch(allPostsSuccess(page.posts, page.nextCursorId, !!page.nextCursorId));
      } catch (error) {
        dispatch(postFailure());
        if (error instanceof FirebaseError) {
          dispatch(sendErrorMessage(mapFirebaseError(error.code)));
          dispatch(postFailure());
        } else {
          dispatch(sendErrorMessage('Unexpected Error occurred'));
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
        dispatch(postSuccess(null));
        dispatch(sendInfoMessage('Post Deleted!!'));
      } catch (error) {
        dispatch(postFailure());
        if (error instanceof FirebaseError) {
          dispatch(sendErrorMessage(mapFirebaseError(error.code)));
        } else {
          dispatch(sendErrorMessage('Unexpected Error occurred'));
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
        dispatch(postSuccess(post));
        dispatch(sendInfoMessage('Post Updated!!'));
      } catch (error) {
        dispatch(postFailure());
        if (error instanceof FirebaseError) {
          dispatch(sendErrorMessage(mapFirebaseError(error.code)));
          dispatch(postFailure());
        } else {
          dispatch(sendErrorMessage('Unexpected Error occurred'));
        }
      }
    },
    [dispatch],
  );

  const copyPostLinkService = async (postId: string) => {
    const link = `${window.location.origin}/posts/${postId}`;
    try {
      await navigator.clipboard.writeText(link);
      dispatch(sendInfoMessage('Post link copied to clipboard!'));
    } catch {
      dispatch(sendErrorMessage('Failed to copy link'));
    }
  };

  return {
    fetchPostService,
    fetchPostByIdService,
    deletePostByIdService,
    filterPostService,
    updatePostService,
    createPostService,
    copyPostLinkService,
  };
};
