import { useAppSelector } from './reduxHooks';

function useUserInfo() {
  const { email, displayName, uid } = useAppSelector(
    (state) => state.userReducer
  );

  return {
    email,
    displayName,
    uid,
  };
}

export { useUserInfo };
