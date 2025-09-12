import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';

import type { PostQueryParams } from '@app/posts';
import { PostList } from '@components/PostCardList';
import { PostFilter } from '@components/PostFilter';
import { useAppSelector } from '@store/root';
import { usePost } from '@hooks/usePost.hook';

export const PostsFeed = () => {
  const navigate = useNavigate();
  const { isLoading, posts, lastFetchedDocumentId, hasMore } = useAppSelector(
    (state) => state.posts,
  );
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { fetchPostService, filterPostService } = usePost();
  const [filters, setFilters] = useState<PostQueryParams>({ published: true });

  const handlePostOpen = async (postId: string) => {
    await navigate(`/posts/${postId}`);
  };
  useEffect(() => {
    if (inView && hasMore) {
      void fetchPostService({ limit: 10, published: true, lastFetchedDocumentId, ...filters });
    }
  }, [inView, hasMore, lastFetchedDocumentId, fetchPostService]);

  return (
    <>
      <PostFilter
        onChange={(f) => {
          setFilters(f);
          void filterPostService({ limit: 10, ...f });
        }}
        initialFilters={{ order: 'desc', orderByField: 'createdAt' }}
      />
      <PostList posts={posts} isLoading={isLoading} hasMore={hasMore} onOpenPost={handlePostOpen} />
      <div ref={ref}></div>
    </>
  );
};
