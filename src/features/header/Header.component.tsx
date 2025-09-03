import { Link } from 'react-router-dom';

import { Avatar, Button, Dropdown, Flex, Grid, Input, Layout, Menu, Typography } from 'antd';

import { LinkButton } from '@components/LinkButton';
import { ICONS } from '@constants/icon.constants';
import { ROUTES } from '@constants/routes.constants';

import {
  HEADER_DROPDOWN_ITEMS,
  HEADER_DROPDOWN_TRIGGERS,
  HEADER_MENU_ITEMS,
} from './Header.constants';

import './Header.styles.scss';

const { Header: AntHeader } = Layout;
const { Search } = Input;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export const Header: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <AntHeader className="header">
      <Flex gap={8} className="container" align="center">
        <Flex justify="flex-start" align="center" gap={isMobile ? 0 : 16} flex={isMobile ? 0 : 1}>
          <Link to={ROUTES.HOME} className="link header__brand">
            <Title level={2}>BHQ</Title>
          </Link>

          {isMobile ? (
            <Dropdown
              menu={{
                items: HEADER_MENU_ITEMS.map((item) => ({
                  key: item.key,
                  label: <Link to={item.to}>{item.label}</Link>,
                })),
              }}
              trigger={HEADER_DROPDOWN_TRIGGERS}
            >
              <Button type="text" size="large" icon={<ICONS.MENU />} />
            </Dropdown>
          ) : (
            <Menu
              mode="horizontal"
              className="header__menu"
              items={HEADER_MENU_ITEMS.map((item) => ({
                key: item.key,
                label: <Link to={item.to}>{item.label}</Link>,
              }))}
            />
          )}
        </Flex>

        <Flex justify="flex-end" align="center" gap={8} flex={1}>
          <Search
            placeholder="Search stories, authors"
            allowClear
            enterButton
            className="header__search"
          />

          <LinkButton
            size="middle"
            className="header__link"
            to={ROUTES.CREATE_POST}
            icon={'WRITE'}
            label="Write"
          />

          <Dropdown
            menu={{
              items: HEADER_DROPDOWN_ITEMS.map((item) => ({
                key: item.key,
                label: <Link to={item.to}>{item.label}</Link>,
              })),
            }}
            trigger={HEADER_DROPDOWN_TRIGGERS}
          >
            <Button type="link">
              <Avatar icon={<ICONS.USER />} />
            </Button>
          </Dropdown>
        </Flex>
      </Flex>
    </AntHeader>
  );
};
