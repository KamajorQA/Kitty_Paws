import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { useAuth } from '../hooks/useAuth';
import { SiderComponent } from '../components/SiderComponent';
import { HeaderComponent } from '../components/HeaderComponent';
import { Loader } from '../components/Loader';

function MainLayout() {
  const isLoading = useAuth();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Layout>
            <HeaderComponent />
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </Layout>

          <SiderComponent />
        </>
      )}
    </Layout>
  );
}

export { MainLayout };
