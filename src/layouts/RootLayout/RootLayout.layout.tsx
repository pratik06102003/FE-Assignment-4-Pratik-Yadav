import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import { Footer } from '@features/footer';
import { Header } from '@features/header';

import './RootLayout.styles.scss';

const { Content } = Layout;

export const RootLayout = () => (
  <Layout className="root-layout">
    <Header />

    <Content className="container">
      <Outlet />
    </Content>

    <Footer />
  </Layout>
);
