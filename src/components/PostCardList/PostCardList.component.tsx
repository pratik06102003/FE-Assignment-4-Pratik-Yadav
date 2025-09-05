import React, { useMemo } from 'react';
import { Ref } from 'react';

import { Card, Flex, List, Skeleton, Spin, Typography } from 'antd';

import { PostCard } from '@components/PostCard/PostCard.component';

import { Post } from '@app/posts';

type PostListProps = {
  posts: Post[];
  isLoading?: boolean;
  onOpenPost?: (postId: string) => Promise<void>;
  hasMore?: boolean;
  ref: Ref<HTMLDivElement>;
};

export const PostList = ({ posts, isLoading, onOpenPost, hasMore }: PostListProps) => {
  const memoized = useMemo(() => posts ?? [], [posts]);

  if (isLoading && (!memoized || memoized.length === 0)) {
    return (
      <List
        dataSource={[1, 2, 3, 4]}
        renderItem={() => (
          <List.Item>
            <Skeleton active>
              <Card style={{ borderRadius: 12, minHeight: 220 }} />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }

  return (
    <>
      <List
        dataSource={memoized}
        renderItem={(post) => (
          <List.Item>
            <PostCard post={post} onOpen={onOpenPost} />
          </List.Item>
        )}
      />
      <Flex vertical justify="center" align="center">
        {isLoading && <Spin />}
        {!hasMore && <Typography.Text>You have seen it all</Typography.Text>}
      </Flex>
    </>
  );
};
