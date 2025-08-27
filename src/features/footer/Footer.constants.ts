import { FooterItemType } from './Footer.types';

import { ROUTES } from '@constants/routes.constants';

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

export const COLLAPSE_ITEM = [
  {
    key: '1',
    label: 'Explore',
    children: EXPLORE_ITEMS,
  },
  {
    key: '2',
    label: 'Company',
    children: COMPANY_ITEMS,
  },
  {
    key: '3',
    label: 'Resources',
    children: RESOURCE_ITEMS,
  },
];
