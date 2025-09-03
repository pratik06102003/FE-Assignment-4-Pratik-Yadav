import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import { PostList } from '@components/PostCardList';
import { PostFilter } from '@components/PostFilter';
import { clearPosts } from '@store/posts/post.actions';
import { usePost } from '@store/posts/post.services';
import { useAppDispatch, useAppSelector } from '@store/root';

import { PostQueryParams } from '@app/posts/posts.type';

const PostsIndex = () => {
  const dispatch = useAppDispatch();
  const { isFetching, posts, cursor, hasMore } = useAppSelector((state) => state.post);
  const { ref, inView } = useInView({ threshold: 0 });
  const { fetchPostService } = usePost();

  const [filters, setFilters] = useState<PostQueryParams>({ published: true });

  useEffect(() => {
    if (inView && hasMore) {
      void fetchPostService({ limit: 10, published: true, cursor, ...filters });
    }
  }, [inView, hasMore, cursor, fetchPostService]);

  return (
    <>
      <PostFilter
        onChange={(f) => {
          setFilters(f);
          dispatch(clearPosts());
          void fetchPostService({ limit: 10, ...f }); // refetch on filter change
        }}
      />
      <PostList posts={posts} isLoading={isFetching} hasMore={hasMore} ref={ref} />
      <div ref={ref}></div>
    </>
  );
};

export default PostsIndex;
