import { Avatar, Card, Flex, Space, Tag, Typography } from 'antd';

import { PostCardProps } from './PostCard.types';

import './PostCard.styles.scss';
import { UserOutlined } from '@ant-design/icons';
import { formatDate } from '@utils/common.utils';

const { Paragraph, Text, Title } = Typography;

export const PostCard = ({ post, onOpen }: PostCardProps) => {
  const preview = post.content.slice(0, 220) + (post.content.length > 220 ? '…' : '');

  return (
    <Card hoverable className="post-card" onClick={() => onOpen?.(post.id)}>
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

          <Paragraph ellipsis={{ rows: 3 }}>{preview}</Paragraph>
        </Flex>

        {post.tags && post.tags.length > 0 ? (
          <Flex>
            {post.tags.slice(0, 5).map((tag) => (
              <Tag key={`${post.id}-tag-${tag}`}>{tag}</Tag>
            ))}
          </Flex>
        ) : null}
      </Flex>
    </Card>
  );
};
