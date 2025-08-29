import { Link } from 'react-router-dom';

import { Collapse, CollapseProps, Flex, Grid, Layout, Menu, Typography } from 'antd';

import { ICONS } from '@constants/icon.constants';

import { COLLAPSE_ITEM, FOOTER_NAV_LINKS } from './Footer.constants';
import { FooterItemType } from './Footer.types';

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
            {FOOTER_NAV_LINKS.map(({ key, label, to }) => (
              <Link key={key} to={to} className="footer__link">
                {label}
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </AntFooter>
  );
};

const mapChildrenToMenuItems = (children: FooterItemType[]) =>
  children.map(({ key, to, label, icon }) => {
    const Icon = icon ? ICONS[icon] : null;
    return {
      key: key,
      label: (
        <Link to={to} className="footer__link">
          {label}
        </Link>
      ),
      icon: Icon ? <Icon /> : undefined,
    };
  });

const collapseItems: CollapseProps['items'] = COLLAPSE_ITEM.map(({ key, label, children }) => ({
  key: key,
  label: label,
  children: <Menu mode="inline" selectable={false} items={mapChildrenToMenuItems(children)} />,
}));
