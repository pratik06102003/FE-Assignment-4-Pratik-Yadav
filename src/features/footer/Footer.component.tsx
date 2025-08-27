import { Link, NavLink } from 'react-router-dom';

import { Collapse, Flex, Grid, Layout, Menu, Typography } from 'antd';

import { ICONS } from '@constants/icon.constants';

import { COLLAPSE_ITEM } from './Footer.constants';
import { CollapseMenuType, FooterItemType } from './Footer.types';

import './Footer.styles.scss';

const { Footer: AntFooter } = Layout;
const { useBreakpoint } = Grid;
const { Title, Paragraph, Text } = Typography;
const { Item } = Menu;
const { Panel } = Collapse;

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

        <Collapse bordered={false}>{COLLAPSE_ITEM.map((item) => PanelMenu(item))}</Collapse>

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

const FooterItem = (item: FooterItemType) => {
  const { key, icon, label, to } = item;

  return (
    <Item key={key} icon={ICONS[icon]}>
      <Link to={to} className="link">
        {label}
      </Link>
    </Item>
  );
};

const PanelMenu = (menu: CollapseMenuType) => {
  const { key, label, children } = menu;
  return (
    <Panel key={key} header={label}>
      <Menu mode="inline" selectable={false}>
        {children.map((item) => FooterItem(item))}
      </Menu>
    </Panel>
  );
};
