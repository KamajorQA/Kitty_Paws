import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { BsFillSignTurnSlightRightFill } from 'react-icons/bs';

import { useAppDispatch } from '../hooks/reduxHooks';
import { removeUser } from '../store/slices/userSlice';
import { auth } from '../firebase';

function SignOut() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const Logout = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate('/login');
    });
  };

  return (
    <Menu
      mode="inline"
      style={{
        marginTop: '1rem',
      }}
      items={[
        {
          key: 'logout',
          label: 'Sign Out',
          icon: <BsFillSignTurnSlightRightFill />,
        },
      ]}
      onClick={Logout}
    />
  );
}

export { SignOut };
