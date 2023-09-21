import { Layout } from 'antd';

import { TitleComponent } from '../components/Title';
import { CatsTable } from '../components/CatsTable';
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
        <CatsTable />
      </section>
    </Content>
  );
}

export { HomePage };
