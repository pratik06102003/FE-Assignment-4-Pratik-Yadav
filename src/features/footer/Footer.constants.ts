import { ROUTES } from '@constants/routes.constants';

import type { FooterNavLinkType } from './Footer.types';

export const FOOTER_NAV_LINKS: FooterNavLinkType[] = [
  {
    to: ROUTES.PLACEHOLDER,
    label: 'Terms',
    key: 'footer-terms',
  },
  {
    to: ROUTES.PLACEHOLDER,
    label: 'Privacy',
    key: 'footer-privacy',
  },
  {
    to: ROUTES.PLACEHOLDER,
    label: 'Help',
    key: 'footer-help',
  },
];
