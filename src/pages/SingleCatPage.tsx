import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { Button, Image } from 'antd';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

import {
  useFetchSingleCatQuery,
  useUpdateCatLikeMutation,
} from '../store/services/catsApi';
import { useUserInfo } from '../hooks/useUserInfo';
import { TitleComponent } from '../components/Title';
import { Loader } from '../components/Loader';

import { NotFoundPage } from './NotFoundPage';

function SingleCatPage() {
  const { uid } = useUserInfo();
  const { catId } = useParams<{ catId: string }>();

  const [updateCatLike] = useUpdateCatLikeMutation();

  const { data, isLoading, isError } = useFetchSingleCatQuery(catId as string);
  const [isFavorite, setIsFavorite] = useState(data?.likes?.includes(uid));

  useEffect(() => {
    setIsFavorite(data?.likes?.includes(uid));
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [data, isLoading]);

  const likeIcon = isFavorite ? <FcLike /> : <FcLikePlaceholder />;

  const handleUpdateLike = () => {
    if (isFavorite) {
      const unlikedArr = data?.likes?.filter((el) => el !== uid);
      updateCatLike({
        id: catId as string,
        catData: { likes: unlikedArr as string[] },
      });
    } else if (data?.likes?.includes(uid) === false) {
      const likedArr = [...data?.likes, uid];
      updateCatLike({ id: catId as string, catData: { likes: likedArr } });
    }
  };

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
                  onClick={handleUpdateLike}
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
