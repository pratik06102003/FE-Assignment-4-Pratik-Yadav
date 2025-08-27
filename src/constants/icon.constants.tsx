import { ReactNode } from 'react';

import {
  BookOutlined,
  FireOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  TagsOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const ICONS: Record<string, ReactNode> = {
  book: <BookOutlined />,
  fire: <FireOutlined />,
  info: <InfoCircleOutlined />,
  link: <LinkOutlined />,
  mail: <MailOutlined />,
  question: <QuestionCircleOutlined />,
  tags: <TagsOutlined />,
  team: <TeamOutlined />,
  user: <UserOutlined />,
};
