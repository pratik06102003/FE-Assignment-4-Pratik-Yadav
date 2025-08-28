import { ForwardRefExoticComponent } from 'react';

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
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';

export type AntdIconType = ForwardRefExoticComponent<IconBaseProps>;

export const ICONS: Record<string, AntdIconType> = {
  book: BookOutlined,
  fire: FireOutlined,
  info: InfoCircleOutlined,
  link: LinkOutlined,
  mail: MailOutlined,
  question: QuestionCircleOutlined,
  tags: TagsOutlined,
  team: TeamOutlined,
  user: UserOutlined,
};
