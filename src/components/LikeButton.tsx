import { Button } from 'antd';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

import { IKittensDataArranged } from '../models/data';
import { useUpdateCatLikeMutation } from '../store/services/catsApi';

import { useUserInfo } from '../hooks/useUserInfo';

interface ILikeBtnProps {
  catInstance: IKittensDataArranged;
}

function LikeButton({ catInstance }: ILikeBtnProps) {
  const [updateCatLike, { isLoading }] = useUpdateCatLikeMutation();

  const { uid } = useUserInfo();

  const isLiked = catInstance?.likes?.includes(uid) ? true : false;

  const likeIt = (catInstance: IKittensDataArranged) => {
    const likedArr = [...catInstance.likes, uid];
    updateCatLike({
      id: catInstance.id,
      catData: { likes: likedArr },
    }).unwrap();
  };

  const dislikeIt = (catInstance: IKittensDataArranged) => {
    const unlikedArr = catInstance.likes.filter((el) => el !== uid);
    updateCatLike({
      id: catInstance.id,
      catData: { likes: unlikedArr },
    }).unwrap();
  };

  const likeIcon = isLiked ? <FcLike /> : <FcLikePlaceholder />;

  const handleLike = isLiked ? dislikeIt : likeIt;

  return (
    <Button
      className="flexCenter"
      icon={likeIcon}
      loading={isLoading}
      onClick={() => handleLike(catInstance)}
    />
  );
}

export { LikeButton };
