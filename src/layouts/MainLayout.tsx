import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { SiderComponent } from '../components/SiderComponent';
import { HeaderComponent } from '../components/HeaderComponent';

function MainLayout() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout>
        <HeaderComponent />
        <Outlet />
      </Layout>

      <SiderComponent />
    </Layout>
  );
}

export { MainLayout };
