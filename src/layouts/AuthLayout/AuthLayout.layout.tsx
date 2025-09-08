import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import './AuthLayout.styles.scss';

const { Content } = Layout;

export const AuthLayout = () => (
  <Layout className="auth-layout">
    <Content className="container">
      <Outlet />
    </Content>
  </Layout>
);
