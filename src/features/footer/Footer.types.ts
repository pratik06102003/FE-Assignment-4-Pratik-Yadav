import type { ROUTES } from '@constants/routes.constants';

export type FooterNavLinkType = {
  key: string;
  label: string;
  to: (typeof ROUTES)[keyof typeof ROUTES];
};
