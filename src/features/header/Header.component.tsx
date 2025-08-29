import { Link } from 'react-router-dom';

import { Avatar, Button, Dropdown, Flex, Grid, Input, Layout, Menu, Typography } from 'antd';
import { EditOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

import { ROUTES } from '@constants/routes.constants';

import { DROPDOWN_ITEMS, HEADER_DROPDOWN_TRIGGERS, MENU_ITEMS } from './Header.constants';

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
        <Flex justify="flex-start" align="center" gap={isMobile ? 0 : 16}>
          {!isMobile && (
            <Link to={ROUTES.HOME} className="header__link">
              <Title level={2}>BHQ</Title>
            </Link>
          )}

          {isMobile ? (
            <Dropdown
              menu={{
                items: MENU_ITEMS.map((item) => ({
                  key: item.key,
                  label: <Link to={item.to}>{item.label}</Link>,
                })),
              }}
              trigger={HEADER_DROPDOWN_TRIGGERS}
            >
              <Button type="text" size="large" icon={<MenuFoldOutlined />} />
            </Dropdown>
          ) : (
            <Menu
              mode="horizontal"
              items={MENU_ITEMS.map((item) => ({
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

          <Link to={ROUTES.CREATE_POST} className="header__link">
            <Button size="middle" icon={<EditOutlined />} tabIndex={-1}>
              Write
            </Button>
          </Link>

          <Dropdown
            menu={{
              items: DROPDOWN_ITEMS.map((item) => ({
                key: item.key,
                label: <Link to={item.to}>{item.label}</Link>,
              })),
            }}
            trigger={HEADER_DROPDOWN_TRIGGERS}
          >
            <Button type="link">
              <Avatar icon={<UserOutlined />} />
            </Button>
          </Dropdown>
        </Flex>
      </Flex>
    </AntHeader>
  );
};
