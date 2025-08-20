import React from 'react';
import { Layout as AntLayout } from 'antd';
import { Header } from '../header';
import { Footer } from '../footer';

const { Content } = AntLayout;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
    <AntLayout style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />
      <Content style={{ padding: '32px 0' }}>
        <main className="container">{children}</main>
      </Content>
      <Footer />
    </AntLayout>
  );

export default AppLayout;
