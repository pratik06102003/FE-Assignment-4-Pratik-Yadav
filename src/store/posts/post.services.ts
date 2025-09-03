// import { FirebaseError } from 'firebase/app';

import { useCallback } from 'react';

import { useAppDispatch } from '@store/root';

import { fetchPostsRequest, fetchPostsSuccess } from './post.actions';

import { getPosts } from '@app/posts';
import { PostQueryParams, PostsPage } from '@app/posts/posts.type';

export const usePost = () => {
  const dispatch = useAppDispatch();

  const fetchPostService = useCallback(
    async (params: PostQueryParams) => {
      dispatch(fetchPostsRequest());
      const page: PostsPage = await getPosts({ ...params });
      dispatch(fetchPostsSuccess(page.posts, page.nextCursor!, !!page.nextCursor));
    },
    [dispatch],
  );

  return { fetchPostService };
};
