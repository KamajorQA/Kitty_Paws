import { Layout } from 'antd';

import { TitleComponent } from '../components/Title';
const { Content } = Layout;

function HomePage() {
  return (
    <Content
      style={{
        padding: '20px 50px',
      }}
    >
      <TitleComponent level={2}>Cats list</TitleComponent>

      <section className="flexCenter contentWrapper">
        Content placed here lorem100*10
      </section>
    </Content>
  );
}

export { HomePage };
