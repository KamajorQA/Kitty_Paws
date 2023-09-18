// import { useContext } from 'react';
import { Menu } from 'antd';
import { RiContactsFill } from 'react-icons/ri';
import { BiSearchAlt } from 'react-icons/bi';
import { FaPaw } from 'react-icons/fa';

import { useControlNavigation } from '../hooks/useControlNavigation';
// import { SiderContext } from '../context/SiderContext';

function MenuComponent() {
  const { highlightActiveLink, goToChosenPage } = useControlNavigation();

  // const { collapsed } = useContext(SiderContext);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['/']}
      selectedKeys={highlightActiveLink()}
      items={[
        {
          key: '/',
          label: 'Home',
          icon: <FaPaw />,
        },
        {
          key: 'contacts',
          label: 'Contacts',
          icon: <RiContactsFill />,
        },
        {
          key: 'favorites',
          label: 'Favorites',
          icon: <BiSearchAlt />,
        },
      ]}
      onClick={goToChosenPage}
    />
  );
}

export { MenuComponent };
