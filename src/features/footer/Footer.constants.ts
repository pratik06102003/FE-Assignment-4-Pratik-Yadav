import { ROUTES } from '@constants/routes.constants';

import type { FooterNavLinkType } from './Footer.types';

export const FOOTER_NAV_LINKS: FooterNavLinkType[] = [
  {
    to: ROUTES.TERMS,
    label: 'Terms',
    key: 'footer-terms',
  },
  {
    to: ROUTES.PRIVACY,
    label: 'Privacy',
    key: 'footer-privacy',
  },
  {
    to: ROUTES.HELP,
    label: 'Help',
    key: 'footer-help',
  },
];
