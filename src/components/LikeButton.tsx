import { Button } from 'antd';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

import { IKittensDataArranged } from '../models/data';
import { useUserInfo } from '../hooks/useUserInfo';
import { useLike } from '../hooks/useLike';

interface ILikeBtnProps {
  catInstance: IKittensDataArranged;
}

function LikeButton({ catInstance }: ILikeBtnProps) {
  const { uid } = useUserInfo();

  const isLiked = !!catInstance?.likes?.includes(uid);

  const { handleLike, isLoading } = useLike(isLiked);

  const likeIcon = isLiked ? <FcLike /> : <FcLikePlaceholder />;

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
