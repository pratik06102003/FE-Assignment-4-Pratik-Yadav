import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from '@features/header';
import { Footer } from '@features/footer';

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
