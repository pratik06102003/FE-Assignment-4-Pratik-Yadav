<<<<<<< HEAD
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import { Footer } from '@features/footer';
import { Header } from '@features/header';
=======
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from '@features/header';
import { Footer } from '@features/footer';
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)

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
