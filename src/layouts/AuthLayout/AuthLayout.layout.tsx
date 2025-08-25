import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

const { Content } = Layout;

export const AuthLayout = () => (
  <Layout style={{ height: '100dvh' }}>
    <Content className="container" style={{ display: 'flex', alignItems: 'center' }}>
      <Outlet />
    </Content>
  </Layout>
);
