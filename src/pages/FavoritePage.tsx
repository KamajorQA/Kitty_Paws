import { Layout, Button } from 'antd';

import { TitleComponent } from '../components/Title';
import { Loader } from '../components/Loader';
import { useFetchFavoritesQuery } from '../store/services/catsApi';
import { CarouselComponent } from '../components/CarouselComponent';
import { IKittensData } from '../models/data';
const { Content } = Layout;

function FavoritePage() {
  const { data, isError, isLoading, refetch } = useFetchFavoritesQuery();

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
          <TitleComponent level={2}>Your favorite cats</TitleComponent>

          <CarouselComponent data={data as IKittensData[]} />
        </Content>
      )}
    </>
  );
}

export { FavoritePage };
