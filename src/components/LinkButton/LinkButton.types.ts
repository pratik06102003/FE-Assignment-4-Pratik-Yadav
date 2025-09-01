import type { ButtonProps } from 'antd';

import type { ICONS } from '@constants/icon.constants';
import type { ROUTES } from '@constants/routes.constants';

export type LinkButtonProps = {
  to: (typeof ROUTES)[keyof typeof ROUTES];
  Icon: (typeof ICONS)[keyof typeof ICONS];
  className?: string;
  size: ButtonProps['size'];
  label: string;
};
