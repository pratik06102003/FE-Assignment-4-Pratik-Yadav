import { NavLink } from 'react-router-dom';

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
    <AntHeader className={'header'}>
      <Flex gap={8} className="container">
        <Flex justify="flex-start" align="center" gap={isMobile ? 0 : 16}>
          {!isMobile && (
            <NavLink to="/">
              <Title level={2}>BHQ</Title>
            </NavLink>
          )}

          {isMobile ? (
            <Dropdown
              menu={{ items: MENU_ITEMS }}
              trigger={['click']}
              getPopupContainer={(triggerNode) => triggerNode.parentElement!}
            >
              <Button type="text" size="large" icon={<MenuFoldOutlined />} />
            </Dropdown>
          ) : (
            <Menu mode="horizontal" items={MENU_ITEMS} style={{ flex: 1 }} />
          )}
        </Flex>

        <Flex justify="flex-end" align="center" gap={8} flex={1}>
          <Search
            placeholder="Search stories, authors"
            allowClear
            enterButton
            className="header__search"
          />

          <NavLink to="/posts/create" style={{ textDecoration: 'none' }}>
            <Button size="middle" icon={<EditOutlined />}>
              Write
            </Button>
          </NavLink>

          <Dropdown
            menu={{ items: DROPDOWN_ITEMS }}
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
