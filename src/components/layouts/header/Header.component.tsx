import React from 'react';
import {
  Layout,
  Input,
  Button,
  Dropdown,
  Avatar,
  Menu,
  Flex,
  Grid,
  Typography,
} from 'antd';
import {
  EditOutlined,
  UserOutlined,
  DownCircleOutlined,
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Search } = Input;
const { useBreakpoint } = Grid;

export const Header: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const menuItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'stories', label: 'My Stories' },
    { key: 'settings', label: 'Settings' },
    { type: 'divider' as const },
    { key: 'logout', label: 'Logout' },
  ];

  const items = [
    {
      label: <a href="/">Home</a>,
      key: '1',
    },
    {
      label: <a href="/blogs">Blogs</a>,
      key: '2',
    },
    {
      label: <a href="/about">About</a>,
      key: '3',
    },
  ];

  return (
    <AntHeader className={'header'}>
      <Flex gap={8} style={{ height: '100%' }}>
        <Flex
          justify="flex-start"
          align="center"
          gap={isMobile ? 0 : 16}
          flex={1}
          style={{ outline: '2px solid black' }}
        >
          <Button type="link" className="brand" href="/">
            <Typography.Title level={3} style={{ margin: 0 }}>
              BHQ
            </Typography.Title>
          </Button>

          {isMobile ? (
            <Dropdown menu={{ items }} trigger={['click']} placement="top">
              <Button
                type="text"
                size="large"
                icon={<DownCircleOutlined style={{ fontSize: '24px' }} />}
              />
            </Dropdown>
          ) : (
            <Menu mode="horizontal" items={items} style={{ flex: 1 }} />
          )}
        </Flex>

        <Flex
          justify="flex-end"
          align="center"
          gap={16}
          flex={1}
          style={{ outline: '2px solid black' }}
        >
          <Search
            placeholder="Search stories, authors"
            allowClear
            enterButton
            className="search"
          />

          <Button size="middle" icon={<EditOutlined />}>
            Write
          </Button>

          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button type="link">
              <Avatar icon={<UserOutlined />} />
            </Button>
          </Dropdown>
        </Flex>
      </Flex>
    </AntHeader>
  );
};
