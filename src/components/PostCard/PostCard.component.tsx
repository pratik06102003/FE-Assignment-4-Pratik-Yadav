import { Avatar, Card, Flex, Space, Tag, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { formatDate } from '@utils/common.utils';

import type { PostCardProps } from './PostCard.types';

import './PostCard.styles.scss';

const { Paragraph, Text, Title } = Typography;

export const PostCard = (props: PostCardProps) => {
  const { post, onOpen } = props;

  return (
    <Card hoverable className="post-card" onClick={() => void onOpen(post.id)}>
      <Flex vertical gap={12}>
        <Title level={4} ellipsis={{ rows: 2 }}>
          {post.title}
        </Title>

        <Flex vertical gap={16}>
          <Space size="small">
            <Avatar icon={<UserOutlined />} />
            <Flex vertical>
              <Text strong>{post.author?.firstName || 'Anonymous'}</Text>
              <Text type="secondary" className="post-card__date">
                {post.createdAt && formatDate(post.createdAt)}
              </Text>
            </Flex>
          </Space>

          <Paragraph ellipsis={{ rows: 2 }}>{post.content}</Paragraph>
        </Flex>

        {post.tags && post.tags.length > 0 ? (
          <Flex wrap gap={4}>
            {post.tags.slice(0, 5).map((tag, index) => (
              <Tag key={`${post.id}-tag-${tag}-${index}`}>{tag}</Tag>
            ))}
            {post.tags.length > 5 && <Tag key="more-tags">+{post.tags.length - 5} more</Tag>}
          </Flex>
        ) : null}
      </Flex>
    </Card>
  );
};
