import { Menu } from 'antd';
import { FaPaw } from 'react-icons/fa';
import { LuCat } from 'react-icons/lu';
import { LiaUserCircle } from 'react-icons/lia';
import { MdFavoriteBorder } from 'react-icons/md';
import { LiaMailBulkSolid } from 'react-icons/lia';

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
          key: 'userinfo',
          label: 'User info',
          icon: <LiaUserCircle />,
        },
        {
          key: 'newcat',
          label: 'Add Your Cat',
          icon: <LuCat />,
        },
        {
          key: 'contacts',
          label: 'Contacts',
          icon: <LiaMailBulkSolid />,
        },
      ]}
      onClick={goToChosenPage}
    />
  );
}

export { MenuComponent };
