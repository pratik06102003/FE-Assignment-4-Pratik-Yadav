import { Link, NavLink } from 'react-router-dom';

import { Collapse, CollapseProps, Flex, Grid, Layout, Menu, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

import { COLLAPSE_ITEM } from './Footer.constants';
import { CollapseMenuType, FooterItemType } from './Footer.types';

import './Footer.styles.scss';
import { ICONS } from '@constants/icon.constants';

const { Footer: AntFooter } = Layout;
const { useBreakpoint } = Grid;
const { Title, Paragraph, Text } = Typography;

export const Footer = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  return (
    <AntFooter className="footer">
      <Flex vertical gap={24} className="container">
        <Flex vertical>
          <Title level={2}>BlogsHQ</Title>
          <Paragraph type="secondary">
            Read, write, and share your thoughts with the world.
          </Paragraph>
        </Flex>

        <Collapse bordered={false} items={COLLAPSE_ITEM.map((menu) => createCollapseMenu(menu))} />

        <Flex gap={8} justify="space-between" align="center" vertical>
          <Text type="secondary">{new Date().getFullYear()} BlogsHQ</Text>
          <Flex gap={isMobile ? 0 : 32} align="center" vertical={isMobile}>
            <NavLink to="/privacy" className="ant-typography">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="ant-typography">
              Terms
            </NavLink>
            <NavLink to="/help" className="ant-typography">
              Help
            </NavLink>
          </Flex>
        </Flex>
      </Flex>
    </AntFooter>
  );
};

const createFooterItem = (item: FooterItemType): ItemType<MenuItemType> => {
  const { key, icon, label, to } = item;
  return {
    key,
    icon: ICONS[icon],
    label: (
      <Link to={to} className="link">
        {label}
      </Link>
    ),
  };
};

const createCollapseMenu = (
  menu: CollapseMenuType,
): NonNullable<CollapseProps['items']>[number] => {
  const { key, label, children } = menu;
  return {
    key,
    label,
    children: (
      <Menu
        key={key}
        mode="inline"
        selectable={false}
        items={children.map((item) => createFooterItem(item))}
      />
    ),
  };
};
