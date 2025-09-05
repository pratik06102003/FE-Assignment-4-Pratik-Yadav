import { TRIGGERS } from '@constants/common.constant';
import { ROUTES } from '@constants/routes.constants';

import type { HeaderMenuItemType } from './Header.types';

// Header dropdown items (user menu)
export const HEADER_DROPDOWN_ITEMS: HeaderMenuItemType[] = [
  { key: 'profile', label: 'Profile', to: ROUTES.PLACEHOLDER },
  { key: 'stories', label: 'My Stories', to: ROUTES.PLACEHOLDER },
  { key: 'settings', label: 'Settings', to: ROUTES.PLACEHOLDER },
  { key: 'logout', label: 'Logout', to: ROUTES.LOGOUT },
];

// Header main menu items
export const HEADER_MENU_ITEMS: HeaderMenuItemType[] = [
  { key: '1', label: 'Home', to: ROUTES.HOME },
  { key: '2', label: 'Blogs', to: ROUTES.BLOGS },
  { key: '3', label: 'About', to: ROUTES.PLACEHOLDER },
];
//Header Dropdown triggers
export const HEADER_DROPDOWN_TRIGGERS = [TRIGGERS.CLICK];
