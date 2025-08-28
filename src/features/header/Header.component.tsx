import { Link } from 'react-router-dom';

import { Avatar, Button, Dropdown, Flex, Grid, Input, Layout, Menu, Typography } from 'antd';

import { DROPDOWN_ITEMS, MENU_ITEMS } from './Header.constants';

import './Header.styles.scss';
import { EditOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Search } = Input;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export const Header: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <AntHeader className="header">
      <Flex gap={8} className="container">
        <Flex justify="flex-start" align="center" gap={isMobile ? 0 : 16}>
          {!isMobile && (
            <Link to="/" className="link">
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
              trigger={['click']}
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
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
              style={{ flex: 1 }}
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

          <Link to="/posts/create">
            <Button size="middle" icon={<EditOutlined />}>
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
            trigger={['click']}
            getPopupContainer={(triggerNode) => triggerNode.parentElement!}
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
