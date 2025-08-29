import { ROUTES } from '@constants/routes.constants';

import { FooterItemType } from './Footer.types';

// Explore menu items
export const EXPLORE_ITEMS: FooterItemType[] = [
  {
    key: 'trending',
    icon: 'fire',
    label: 'Trending',
    to: ROUTES.TRENDING,
  },
  {
    key: 'topics',
    icon: 'tags',
    label: 'Topics',
    to: ROUTES.TOPICS,
  },
  {
    key: 'writers',
    icon: 'user',
    label: 'Writers',
    to: ROUTES.WRITERS,
  },
];

// Company menu items
export const COMPANY_ITEMS: FooterItemType[] = [
  {
    key: 'about',
    icon: 'info',
    label: 'About',
    to: ROUTES.ABOUT,
  },
  {
    key: 'careers',
    icon: 'team',
    label: 'Careers',
    to: ROUTES.CAREERS,
  },
  {
    key: 'contact',
    icon: 'mail',
    label: 'Contact',
    to: ROUTES.CONTACT,
  },
];

// Resources menu items
export const RESOURCE_ITEMS: FooterItemType[] = [
  { key: 'docs', icon: 'book', label: 'Docs', to: ROUTES.DOCS },
  { key: 'api', icon: 'link', label: 'API', to: ROUTES.API },
  {
    key: 'faq',
    icon: 'question',
    label: 'FAQ',
    to: '/faq',
  },
];

// Collapse menu
export const COLLAPSE_ITEM = [
  {
    key: 'collapse-explore',
    label: 'Explore',
    children: EXPLORE_ITEMS,
  },
  {
    key: 'collapse-company',
    label: 'Company',
    children: COMPANY_ITEMS,
  },
  {
    key: 'collapse-resources',
    label: 'Resources',
    children: RESOURCE_ITEMS,
  },
];

//Footer nav links
export const FOOTER_NAV_LINKS = [
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
