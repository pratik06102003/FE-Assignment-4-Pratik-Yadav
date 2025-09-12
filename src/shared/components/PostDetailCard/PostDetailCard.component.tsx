import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Popconfirm,
  Result,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { DeleteOutlined, EditOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';

import { formatDate } from '@utils//common.utils';

import type { PostDetailCardProps } from './PostDetailCard.types';

import './PostDetailCard.styles.scss';

const { Title, Text, Paragraph } = Typography;

export const PostDetailCard = (props: PostDetailCardProps) => {
  const { post, isLoading, showAuthorActions, onEdit, onDelete, onShare } = props;

  if (isLoading) {
    return (
      <Card>
        <Flex vertical gap={32}>
          <Skeleton.Avatar active size={64} />
          <Skeleton active paragraph={{ rows: 4, width: '80%' }} title={{ width: '80%' }} />
          <Skeleton active paragraph={{ rows: 2, width: ['40%', '80%'] }} />
          <Space size="small">
            <Skeleton.Button active />
            <Skeleton.Button active />
            <Skeleton.Button active />
          </Space>
        </Flex>
      </Card>
    );
  }

  if (!post) {
    return <Result status="error" title="Unable to Load Post"></Result>;
  }

  const Header = (
    <Flex align="center" justify="space-between" wrap className="post-card-header">
      <Space align="center" size={16}>
        <Avatar size={64}>
          <UserOutlined />
        </Avatar>

        <Flex vertical>
          <Title level={2}>{post.title}</Title>
          <Text>{post.authorDisplayName || 'Anonymous Author'}</Text>
        </Flex>
      </Space>
    </Flex>
  );

  const Footer = (
    <Space>
      <Tooltip title="Share">
        <Button icon={<ShareAltOutlined />} onClick={() => void onShare()} />
      </Tooltip>

      {showAuthorActions && (
        <>
          <Tooltip title="Edit">
            <Button aria-label="Edit post" icon={<EditOutlined />} onClick={() => void onEdit()} />
          </Tooltip>
          <Popconfirm
            title="Delete this post?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => void onDelete()}
          >
            <Tooltip title="Delete">
              <Button aria-label="Delete post" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </>
      )}
    </Space>
  );

  return (
    <Card
      title={isLoading ? <Skeleton.Avatar active size={64} shape="square" /> : Header}
      className="post-card"
    >
      <Paragraph>
        {`Last updated at ${formatDate(post.updatedAt)} | Created At: ${formatDate(
          post.createdAt,
        )}`}
      </Paragraph>

      {!!post.tags?.length && (
        <Space wrap>
          {post.tags.map((tag) => (
            <Tag key={`${post.id}-${tag}`}>{tag}</Tag>
          ))}
        </Space>
      )}

      <Divider />
      <Paragraph className="post-card-content">{post.content}</Paragraph>
      <Divider />

      <div>{Footer}</div>
    </Card>
  );
};
