import type { ROUTES } from '@constants/routes.constants';

export type HeaderMenuItemType = {
  key: string;
  label: string;
  to: (typeof ROUTES)[keyof typeof ROUTES];
};
