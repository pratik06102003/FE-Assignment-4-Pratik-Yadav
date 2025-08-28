import { ROUTES } from '@constants/routes.constants';

import { HeaderMenuItemType } from './Header.types';

// Header dropdown items (user menu)
export const DROPDOWN_ITEMS: HeaderMenuItemType[] = [
  { key: 'profile', label: 'Profile', to: ROUTES.PROFILE },
  { key: 'stories', label: 'My Stories', to: ROUTES.STORIES },
  { key: 'settings', label: 'Settings', to: ROUTES.SETTINGS },
  { key: 'logout', label: 'Logout', to: ROUTES.LOGOUT },
];

// Header main menu items
export const MENU_ITEMS: HeaderMenuItemType[] = [
  { key: '1', label: 'Home', to: ROUTES.HOME },
  { key: '2', label: 'Blogs', to: ROUTES.BLOGS },
  { key: '3', label: 'About', to: ROUTES.ABOUT },
];
