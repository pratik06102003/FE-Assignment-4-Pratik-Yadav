import { TRIGGERS } from '@constants/common.constant';
import { ROUTES } from '@constants/routes.constants';

import type { HeaderMenuItemType } from './Header.types';

// Header main menu items
export const HEADER_MENU_ITEMS: HeaderMenuItemType[] = [
  { key: '1', label: 'Home', to: ROUTES.HOME },
  { key: '2', label: 'Blogs', to: ROUTES.BLOGS },
  { key: '3', label: 'About', to: ROUTES.PLACEHOLDER },
];
//Header Dropdown triggers
export const HEADER_DROPDOWN_TRIGGERS = [TRIGGERS.CLICK];
