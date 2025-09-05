import { Link } from 'react-router-dom';

import { Flex, Layout, Typography } from 'antd';

import { APP_COPYRIGHT_YEAR } from '@constants/common.constant';

import { FOOTER_NAV_LINKS } from './Footer.constants';

import './Footer.styles.scss';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;

export const Footer = () => (
  <AntFooter className="footer">
    <Flex gap={12} className="container" vertical>
      <Flex vertical>
        <Title level={2}>BlogsHQ</Title>
        <Paragraph type="secondary">Read, write, and share your thoughts with the world.</Paragraph>
      </Flex>

      <Flex vertical gap={4}>
        <Text type="secondary">{APP_COPYRIGHT_YEAR} BlogsHQ</Text>
        <Flex gap={16} align="center">
          {FOOTER_NAV_LINKS.map(({ key, label, to }) => (
            <Link key={key} to={to} className="link">
              {label}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  </AntFooter>
);
