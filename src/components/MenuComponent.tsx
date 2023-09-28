import { Menu } from 'antd';
import { RiContactsFill } from 'react-icons/ri';
import { LuCat } from 'react-icons/lu';
import { MdFavoriteBorder } from 'react-icons/md';
import { FaPaw } from 'react-icons/fa';

import { useControlNavigation } from '../hooks/useControlNavigation';

function MenuComponent() {
  const { highlightActiveLink, goToChosenPage } = useControlNavigation();

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
          key: 'favorites',
          label: 'Favorites',
          icon: <MdFavoriteBorder />,
        },
        {
          key: 'newcat',
          label: 'Add Your Cat',
          icon: <LuCat />,
        },
        {
          key: 'contacts',
          label: 'Contacts',
          icon: <RiContactsFill />,
        },
      ]}
      onClick={goToChosenPage}
    />
  );
}

export { MenuComponent };
