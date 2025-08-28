import { Link, NavLink } from 'react-router-dom';

import { Collapse, CollapseProps, Flex, Grid, Layout, Menu, Typography } from 'antd';

import { MenuItemProps } from '@components/MenuItem';
import { ICONS } from '@constants/icon.constants';

import { COLLAPSE_ITEM } from './Footer.constants';

import './Footer.styles.scss';

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

        <Collapse bordered={false} items={collapseItems} />

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

const mapChildrenToMenuItems = (children: MenuItemProps[]) =>
  children.map((child) => {
    const { key, to, label, icon } = child;
    const Icon = icon ? ICONS[icon] : null;
    return {
      key: key,
      label: <Link to={to}>{label}</Link>,
      icon: Icon ? <Icon /> : undefined,
    };
  });

const collapseItems: NonNullable<CollapseProps['items']> = COLLAPSE_ITEM.map((menu) => ({
  key: menu.key,
  label: menu.label,
  children: <Menu mode="inline" selectable={false} items={mapChildrenToMenuItems(menu.children)} />,
}));
