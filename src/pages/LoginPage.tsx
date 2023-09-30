import { useNavigate } from 'react-router-dom';
import { Button, Layout } from 'antd';
import { signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../firebase';

import { setUser } from '../store/slices/userSlice';
import { TitleComponent } from '../components/Title';
import { useAppDispatch } from '../hooks/reduxHooks';
const { Content } = Layout;

function LoginPage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );
        navigate('/');
      })
      .catch((error) => alert(error));
  };

  return (
    <Content
      style={{
        padding: '20px 50px',
      }}
    >
      <TitleComponent level={2}>Login</TitleComponent>

      <main
        className="flexCenter contentWrapper"
        style={{
          gap: '1rem',
        }}
      >
        <TitleComponent level={2}>Authentication needed</TitleComponent>
        <TitleComponent level={3}>
          You can use your Google account to login
        </TitleComponent>

        <Button
          type="dashed"
          style={{
            fontFamily: 'Great Vibes',
            boxShadow: '0 2px 0 rgba(0, 147, 255, 0.35)',
          }}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </main>
    </Content>
  );
}

export default LoginPage;
