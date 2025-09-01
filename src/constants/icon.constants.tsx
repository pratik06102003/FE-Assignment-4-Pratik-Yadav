import { EditOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import type { IconBaseProps } from '@ant-design/icons/lib/components/Icon';

import type { ForwardRefExoticComponent } from 'react';

export type AntdIconType = ForwardRefExoticComponent<IconBaseProps>;

export const ICONS: Record<string, AntdIconType> = {
  USER: UserOutlined,
  WRITE: EditOutlined,
  MENU: MenuFoldOutlined,
};
