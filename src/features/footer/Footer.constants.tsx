import { NavLink } from 'react-router-dom';
import {
  FireOutlined,
  TagsOutlined,
  UserOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  MailOutlined,
  BookOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

// Explore menu items
export const EXPLORE_ITEMS = [
  {
    key: 'trending',
    icon: <FireOutlined />,
    label: <NavLink to="/trending">Trending</NavLink>,
    to: '/trending',
  },
  {
    key: 'topics',
    icon: <TagsOutlined />,
    label: <NavLink to="/topics">Topics</NavLink>,
    to: '/topics',
  },
  {
    key: 'writers',
    icon: <UserOutlined />,
    label: <NavLink to="/writers">Writers</NavLink>,
    to: '/writers',
  },
];

// Company menu items
export const COMPANY_ITEMS = [
  {
    key: 'about',
    icon: <InfoCircleOutlined />,
    label: <NavLink to="/about">About</NavLink>,
    to: '/about',
  },
  {
    key: 'careers',
    icon: <TeamOutlined />,
    label: <NavLink to="/careers">Careers</NavLink>,
    to: '/careers',
  },
  {
    key: 'contact',
    icon: <MailOutlined />,
    label: <NavLink to="/contact">Contact</NavLink>,
    to: '/contact',
  },
];

// Resources menu items
export const RESOURCE_ITEMS = [
  { key: 'docs', icon: <BookOutlined />, label: <NavLink to="/docs">Docs</NavLink>, to: '/docs' },
  { key: 'api', icon: <LinkOutlined />, label: <NavLink to="/api">API</NavLink>, to: '/api' },
  {
    key: 'faq',
    icon: <QuestionCircleOutlined />,
    label: <NavLink to="/faq">FAQ</NavLink>,
    to: '/faq',
  },
];
