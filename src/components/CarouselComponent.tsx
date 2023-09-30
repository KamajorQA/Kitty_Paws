import { Button, Carousel, Image } from 'antd';

import { IKittensData, IKittensDataArranged } from '../models/data';
import { useControlNavigation } from '../hooks/useControlNavigation';

import { LikeButton } from './LikeButton';

interface ICarouselProps {
  data: IKittensData[];
}

const parentStyle: React.CSSProperties = {
  width: '100%',
  position: 'relative',
  textAlign: 'center',
};

const childStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
};

function CarouselComponent({ data }: ICarouselProps) {
  const { goHome } = useControlNavigation();
  return (
    <div>
      {data && data.length ? (
        <Carousel autoplay dots={{ className: 'carouselDots' }}>
          {data.map((catInstance) => (
            <section
              className="contentWrapper flexCenter carouselWrapper"
              key={catInstance.id}
            >
              <article style={parentStyle}>
                <div style={childStyle}>
                  <LikeButton
                    catInstance={catInstance as IKittensDataArranged}
                  />
                </div>
                <h2>{catInstance.title}</h2>
              </article>

              <Image
                src={catInstance.image}
                style={{
                  maxHeight: '20rem',
                }}
              />
            </section>
          ))}
        </Carousel>
      ) : (
        <section className="contentWrapper flexCenter">
          <h2>You haven't liked anything yet!</h2>
          <h3
            style={{
              marginTop: 0,
            }}
          >
            Try add some cats to your favorites
          </h3>
          <Button onClick={goHome}>Browse all cats</Button>
        </section>
      )}
    </div>
  );
}

export { CarouselComponent };
