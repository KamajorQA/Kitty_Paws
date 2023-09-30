import { Divider, Image } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { TitleComponent } from '../components/Title';
import { useUserInfo } from '../hooks/useUserInfo';
import { auth } from '../firebase';

function UserInfoPage() {
  const { email, displayName } = useUserInfo();
  const userImage = auth?.currentUser?.photoURL;

  return (
    <Content
      style={{
        padding: '20px 50px',
      }}
    >
      <TitleComponent level={2}>User Info</TitleComponent>
      <section className="flexCenter contentWrapper">
        {!!userImage && (
          <Image
            width={'10%'}
            src={userImage}
            style={{
              borderRadius: 10,
            }}
          />
        )}
        <Divider
          plain
          style={{
            margin: '2rem 0 0 0',
          }}
        >
          You are now logged in as:
        </Divider>
        <h2>{displayName}</h2>

        <Divider
          plain
          style={{
            margin: '1.2rem 0 0 0',
          }}
        >
          your email is:
        </Divider>
        <h2>{email}</h2>
      </section>
    </Content>
  );
}

export default UserInfoPage;
