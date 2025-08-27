import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import './RootLayout.styles.scss';
import { Footer } from '@features/footer';
import { Header } from '@features/header';

const { Content } = Layout;

export const RootLayout = () => (
  <Layout>
    <Header />

    <Content className="content">
      <Outlet />
    </Content>

    <Footer />
  </Layout>
);
