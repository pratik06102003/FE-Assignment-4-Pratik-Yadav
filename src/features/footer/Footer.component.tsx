import { NavLink } from 'react-router-dom';

import { Collapse, Flex, Grid, Layout, Menu, Typography } from 'antd';

import { COMPANY_ITEMS, EXPLORE_ITEMS, RESOURCE_ITEMS } from './Footer.constants';

import './Footer.styles.scss';

const { Footer: AntFooter } = Layout;
const { useBreakpoint } = Grid;
const { Title, Paragraph, Text } = Typography;

export const Footer: React.FC = () => {
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

        <Collapse
          bordered={false}
          items={[
            {
              key: '1',
              label: 'Explore',
              children: <Menu mode="inline" selectable={false} items={EXPLORE_ITEMS} />,
            },
            {
              key: '2',
              label: 'Company',
              children: <Menu mode="inline" selectable={false} items={COMPANY_ITEMS} />,
            },
            {
              key: '3',
              label: 'Resources',
              children: <Menu mode="inline" selectable={false} items={RESOURCE_ITEMS} />,
            },
          ]}
        />

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
