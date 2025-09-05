import React from 'react';

import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  notification,
  Popconfirm,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

import { PostDetailCardProps } from './PostDetailCard.types';

import './PostDetailCard.styles.scss';
import { DeleteOutlined, EditOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import { formatDate } from '@utils/common.utils';

const { Title, Text, Paragraph } = Typography;

export const PostDetailCard = (props: PostDetailCardProps) => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const { post, isLoading, userId, onEdit, onDelete } = props;
  const { author } = post;

  const handleShare = async () => {
    const link = `${window.location.origin}/posts/${post.id}`;
    try {
      await navigator.clipboard.writeText(link);
      notificationApi.success({ message: 'Post link copied to clipboard!' });
    } catch {
      notificationApi.error({ message: 'Failed to copy link' });
    }
  };

  const Header = (
    <Flex align="center" justify="space-between" wrap className="post-card-header">
      <Space align="center" size={16}>
        <Avatar size={64}>
          <UserOutlined />
        </Avatar>

        <Flex vertical>
          <Title level={2}>{post.title}</Title>
          <Text>{author ? `${author.firstName} ${author.lastName}` : 'Anonymous'}</Text>
        </Flex>
      </Space>
    </Flex>
  );

  const Footer = (
    <Space>
      <Tooltip title="Share">
        <Button icon={<ShareAltOutlined />} onClick={() => void handleShare()} />
      </Tooltip>

      {userId !== post.authorId && (
        <>
          <Tooltip title="Edit">
            <Button
              aria-label="Edit post"
              icon={<EditOutlined />}
              onClick={() => void onEdit(post.id)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this post?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => void onDelete(post.id)}
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
    <>
      {contextHolder}
      <Card
        title={isLoading ? <Skeleton.Avatar active size={64} shape="square" /> : Header}
        className="post-card"
        // keep Card's built-in loading disabled so we can fully control skeleton pieces
      >
        {isLoading ? (
          <div>
            <Skeleton active paragraph={{ rows: 4 }} title={{ width: '60%' }} avatar />
            <div style={{ marginTop: 12 }}>
              <Skeleton paragraph={{ rows: 2, width: ['40%', '80%'] }} active />
            </div>
            <div style={{ marginTop: 12 }}>
              <Space size={8}>
                <Skeleton.Button active />
                <Skeleton.Button active />
                <Skeleton.Button active />
              </Space>
            </div>
          </div>
        ) : (
          <>
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
            <Paragraph>{post.content}</Paragraph>
            <Divider />

            <div>{Footer}</div>
          </>
        )}
      </Card>
    </>
  );
};
