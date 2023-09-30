import { Layout, Button } from 'antd';

import { TitleComponent } from '../components/Title';
import { CatsTable } from '../components/CatsTable';
import { Loader } from '../components/Loader';
import { useControlTable } from '../hooks/useControlTable';
const { Content } = Layout;

function HomePage() {
  const { isError, isLoading, refetch } = useControlTable();

  return (
    <>
      {isError && (
        <div className="flexCenter">
          <p>Ошибка при загрузке данных с сервера.</p>
          <Button type="link" onClick={refetch}>
            Попробовать опять
          </Button>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
}

export default HomePage;
