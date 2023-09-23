import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';
import { removeUser, setUser } from '../store/slices/userSlice';

import { useAppDispatch } from './reduxHooks';

function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(removeUser());
        navigate('/login');
      }
      setIsLoading(false);
    });
    return unlisten;
  }, [dispatch, navigate]);

  return isLoading;
}

export { useAuth };
