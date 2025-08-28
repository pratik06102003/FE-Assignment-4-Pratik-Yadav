import { Link } from 'react-router-dom';

import { Menu } from 'antd';

import { ICONS } from '@constants/icon.constants';

import { MenuItemProps } from './MenuItem.types';

const { Item } = Menu;
export const MenuItem = (props: MenuItemProps) => {
  const { key, icon, label, to } = props;
  const Icon = icon ? ICONS[icon] : null;

  return (
    <Item key={key} icon={Icon ? <Icon /> : undefined}>
      <Link to={to} className="link">
        {label}
      </Link>
    </Item>
  );
};
