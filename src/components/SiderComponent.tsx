import { useContext } from 'react';
import Sider from 'antd/es/layout/Sider';

import { SiderContext } from '../context/SiderContext';

import { MenuComponent } from './MenuComponent';
import { SignOut } from './SignOut';

function SiderComponent() {
  const { collapsed } = useContext(SiderContext);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
      <MenuComponent />
      <SignOut />
    </Sider>
  );
}

export { SiderComponent };
