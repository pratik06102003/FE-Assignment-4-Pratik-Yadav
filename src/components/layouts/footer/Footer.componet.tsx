import React from 'react';
import './Footer.scss';
import { Layout, Flex, Menu, Collapse, Grid, Typography } from 'antd';
import {
  FireOutlined,
  TagsOutlined,
  UserOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  MailOutlined,
  BookOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { useBreakpoint } = Grid;
const { Link, Title, Paragraph } = Typography;
export const Footer: React.FC = () => {
  const screens = useBreakpoint();
  const isLarge = screens.md; // true for md and above (≥768px)
  const exploreItems = [
    { key: 'trending', icon: <FireOutlined />, label: 'Trending' },
    { key: 'topics', icon: <TagsOutlined />, label: 'Topics' },
    { key: 'writers', icon: <UserOutlined />, label: 'Writers' },
  ];

  const companyItems = [
    { key: 'about', icon: <InfoCircleOutlined />, label: 'About' },
    { key: 'careers', icon: <TeamOutlined />, label: 'Careers' },
    { key: 'contact', icon: <MailOutlined />, label: 'Contact' },
  ];

  const resourcesItems = [
    { key: 'docs', icon: <BookOutlined />, label: 'Docs' },
    { key: 'api', icon: <LinkOutlined />, label: 'API' },
    { key: 'faq', icon: <QuestionCircleOutlined />, label: 'FAQ' },
  ];

  return (
    <AntFooter className="footer">
      <Flex vertical gap={24} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <Title level={2} className="footer__title">
            BlogsHQ
          </Title>
          <Paragraph type="secondary" className="footer__paragraph">
            Read, write, and share your thoughts with the world.
          </Paragraph>
        </div>

        <Collapse
          className="footer-nav"
          bordered={false}
          defaultActiveKey={isLarge ? ['1', '2'] : []}
        >
          <Collapse.Panel header="Explore" key="1" className="footer-panel">
            <Menu mode="inline" selectable={false} items={exploreItems} />
          </Collapse.Panel>

          <Collapse.Panel header="Company" key="2" className="footer-panel">
            <Menu mode="inline" selectable={false} items={companyItems} />
          </Collapse.Panel>

          <Collapse.Panel header="Resources" key="3" className="footer-panel">
            <Menu mode="inline" selectable={false} items={resourcesItems} />
          </Collapse.Panel>
        </Collapse>

        <Flex gap={8} justify="space-between" align="center" vertical>
          <div>© {new Date().getFullYear()} BlogsHQ</div>
          <Flex gap={32} className="right">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/help">Help</Link>
          </Flex>
        </Flex>
      </Flex>
    </AntFooter>
  );
};
