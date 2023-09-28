import { IKittensData } from '../models/data';
import { useUpdateCatLikeMutation } from '../store/services/catsApi';

import { useUserInfo } from './useUserInfo';

function useLike(isLiked: boolean) {
  const { uid } = useUserInfo();

  const [updateCatLike, { isLoading }] = useUpdateCatLikeMutation();

  const likeIt = (catInstance: IKittensData) => {
    const likedArr = [...catInstance.likes, uid];
    updateCatLike({
      id: catInstance.id,
      catData: { likes: likedArr },
    }).unwrap();
  };

  const dislikeIt = (catInstance: IKittensData) => {
    const unlikedArr = catInstance.likes.filter((el) => el !== uid);
    updateCatLike({
      id: catInstance.id,
      catData: { likes: unlikedArr },
    }).unwrap();
  };

  const handleLike = isLiked ? dislikeIt : likeIt;

  return {
    handleLike,
    isLoading,
  };
}

export { useLike };
