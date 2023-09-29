import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { Button, Image } from 'antd';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

import { useFetchSingleCatQuery } from '../store/services/catsApi';
import { useUserInfo } from '../hooks/useUserInfo';
import { useLike } from '../hooks/useLike';
import { TitleComponent } from '../components/Title';
import { DeleteButton } from '../components/DeleteButton';
import { Loader } from '../components/Loader';

import { NotFoundPage } from './NotFoundPage';

function SingleCatPage() {
  const { uid } = useUserInfo();
  const { catId } = useParams<{ catId: string }>();

  const { data, isLoading, isError } = useFetchSingleCatQuery(catId as string);
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false);

  useEffect(() => {
    setIsFavorite(data?.likes?.includes(uid)); // стейт зависит от внешнего запроса data,
    // которое получается от сервера и изначально всегда undefined. Нужна их синхронизация.
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [data, isLoading]);

  const isCatOwner = data?.author.uid === uid;

  const { handleLike, isLoading: likeIsLoading } = useLike(
    isFavorite as boolean
  );

  const likeIcon = isFavorite ? <FcLike /> : <FcLikePlaceholder />;

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
          {!isLoading && data && !!data.title ? (
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
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                  }}
                  loading={likeIsLoading}
                  onClick={() => handleLike(data)}
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
                <div
                  className="flexCenter"
                  style={{
                    width: '100%',
                  }}
                >
                  <p
                    style={{
                      flex: 1,
                      textAlign: 'center',
                    }}
                  >
                    Owner: {data?.author?.name}
                  </p>
                  {isCatOwner && <DeleteButton catId={data.id} />}
                </div>
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
