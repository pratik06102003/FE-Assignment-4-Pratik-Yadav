import { Card, Flex, List, Skeleton, Typography } from 'antd';

import type { Post } from '@app/posts';
import { PostCard } from '@components/PostCard/PostCard.component';

import type { PostListProps } from './PostCardList.types';

const { Item } = List;
const { Text } = Typography;

export const PostList = ({ posts, isLoading, onOpenPost, hasMore }: PostListProps) => {
  const postsArray = posts ?? [];
  const isInitialLoading = isLoading && postsArray.length === 0;
  const isLoadingMore = isLoading && postsArray.length > 0;

  const dataSource: (Post | number)[] = isInitialLoading
    ? Array.from({ length: 4 }, (_, i) => i + 1)
    : postsArray;

  const renderItem = (item: Post | number, index: number) => {
    if (typeof item === 'number') {
      return (
        <Item key={`skeleton-${index}`}>
          <Skeleton active>
            <Card />
          </Skeleton>
        </Item>
      );
    }

    return (
      <Item key={item.id}>
        <PostCard post={item} onOpen={onOpenPost} />
      </Item>
    );
  };

  return (
    <>
      <List dataSource={dataSource} renderItem={renderItem} />

      <Flex vertical justify="center" align="center">
        {isLoadingMore && (
          <Skeleton active>
            <Card />
          </Skeleton>
        )}

        {!isLoading && !hasMore && <Text>You have seen it all</Text>}
      </Flex>
    </>
  );
};
