import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import { Footer } from '@features/footer';
import { Header } from '@features/header';

const { Content } = Layout;

export const RootLayout = () => (
  <Layout style={{ height: '100dvh' }}>
    <Header />

    <Content className="container">
      <Outlet />
    </Content>

    <Footer />
  </Layout>
);
