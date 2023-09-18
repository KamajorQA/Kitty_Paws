import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Layout, theme } from 'antd';

import { FaPaw } from 'react-icons/fa';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';

import { useControlNavigation } from '../hooks/useControlNavigation';
import { SiderComponent } from '../components/SiderComponent';
import { SiderContext } from '../context/SiderContext';
import { TitleComponent } from '../components/Title';

const { Header } = Layout;

function MainLayout() {
  const {
    token: { colorPrimary, colorBgLayout },
  } = theme.useToken();

  const { goHome } = useControlNavigation();

  const { collapsed, switchCollapse } = useContext(SiderContext);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgLayout,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FaPaw
            style={{
              fontSize: '1.5rem',
              margin: '0 1rem',
              color: colorPrimary,
              cursor: 'pointer',
            }}
            onClick={goHome}
          />

          <TitleComponent level={4}>Kitty Paws</TitleComponent>

          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
            onClick={switchCollapse}
            style={{
              fontSize: '1rem',
              width: 64,
              height: 64,
              justifySelf: 'end',
            }}
          />
        </Header>

        <Outlet />
      </Layout>

      <SiderComponent />
    </Layout>
  );
}

export { MainLayout };
