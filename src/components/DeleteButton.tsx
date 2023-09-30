import { useNavigate } from 'react-router-dom';
import { Tooltip, Button, message } from 'antd';
import { TiDeleteOutline } from 'react-icons/ti';

import { useDeleteCatMutation } from '../store/services/catsApi';

interface IDeleteButtonProps {
  catId: string;
}

function DeleteButton({ catId }: IDeleteButtonProps) {
  const navigate = useNavigate();
  const [deleteCat, { isLoading }] = useDeleteCatMutation();

  const handleDeleteCat = async (id: string) => {
    const ok = await deleteCat(id).unwrap();
    if (ok === 'ok') {
      message.success('cat was deleted!');
      navigate('/');
    } else {
      message.error('deletion failed!');
    }
  };

  return (
    <Tooltip title="Push to delete your kitty from database">
      <Button
        className="flexCenter"
        danger
        type="dashed"
        icon={<TiDeleteOutline />}
        loading={isLoading}
        onClick={() => handleDeleteCat(catId)}
      />
    </Tooltip>
  );
}

export { DeleteButton };
