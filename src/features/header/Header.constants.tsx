import { NavLink } from 'react-router-dom';

// Header dropdown items (user menu)
export const DROPDOWN_ITEMS = [
  { key: 'profile', label: <NavLink to="/profile">Profile</NavLink>, to: '/profile' },
  { key: 'stories', label: <NavLink to="/stories">My Stories</NavLink>, to: '/stories' },
  { key: 'settings', label: <NavLink to="/settings">Settings</NavLink>, to: '/settings' },
  { key: 'logout', label: <NavLink to="/logout">Logout</NavLink>, to: '/logout' },
];

// Header main menu items
export const MENU_ITEMS = [
  { key: '1', label: <NavLink to="/">Home</NavLink>, to: '/' },
  { key: '2', label: <NavLink to="/blogs">Blogs</NavLink>, to: '/blogs' },
  { key: '3', label: <NavLink to="/about">About</NavLink>, to: '/about' },
];
