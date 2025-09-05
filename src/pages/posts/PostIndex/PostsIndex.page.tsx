import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { PostList } from '@components/PostCardList';
import { PostFilter } from '@components/PostFilter';
import { usePost } from '@store/posts/post.services';
import { useAppSelector } from '@store/root';

import { PostQueryParams } from '@app/posts/posts.type';

const PostsIndex = () => {
  const navigate = useNavigate();
  const { isLoading, posts, cursor, hasMore } = useAppSelector((state) => state.posts);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { fetchPostService, filterPostService } = usePost();
  const [filters, setFilters] = useState<PostQueryParams>({ published: true });

  const handlePostOpen = async (postId: string) => {
    await navigate(`/posts/${postId}`);
  };
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
          void filterPostService({ limit: 10, ...f });
        }}
        initialFilters={{ order: 'desc', orderByField: 'createdAt' }}
      />
      <PostList
        posts={posts}
        isLoading={isLoading}
        hasMore={hasMore}
        onOpenPost={handlePostOpen}
        ref={ref}
      />
      <div ref={ref}></div>
    </>
  );
};

export default PostsIndex;
