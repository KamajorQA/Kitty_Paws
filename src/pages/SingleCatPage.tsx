import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { Button, Image } from 'antd';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

import { useFetchSingleCatQuery } from '../store/services/catsApi';
import { TitleComponent } from '../components/Title';
import { Loader } from '../components/Loader';

import { NotFoundPage } from './NotFoundPage';

function SingleCatPage() {
  const [isLiked, setIsLiked] = useState(false);
  const { catId } = useParams<{ catId: string }>();

  const { data, isLoading, isError } = useFetchSingleCatQuery(catId as string);

  const likeIcon = isLiked ? <FcLike /> : <FcLikePlaceholder />;

  return (
    <>
      {isError && (
        <div className="flexCenter">
          <p>Ошибка при загрузке данных с сервера.</p>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {data && !!data.title ? (
            <Content
              style={{
                padding: '20px 50px',
              }}
            >
              <TitleComponent level={2}>{data?.title}</TitleComponent>

              <section
                className="flexCenter contentWrapper"
                style={{
                  position: 'relative',
                }}
              >
                <Button
                  className="flexCenter"
                  icon={likeIcon}
                  loading={false}
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                  }}
                  onClick={() => setIsLiked((prev) => !prev)}
                />
                <h1>{data?.brief}</h1>
                <Image
                  width={'50%'}
                  src={data?.image}
                  style={{
                    margin: ' 1rem 0',
                  }}
                />

                <p
                  style={{
                    textIndent: '3rem',
                    textAlign: 'justify',
                  }}
                >
                  {data?.description}
                </p>
                <p>Owner: {data?.author?.name}</p>
              </section>
            </Content>
          ) : (
            <NotFoundPage />
          )}
        </div>
      )}
    </>
  );
}

export { SingleCatPage };
