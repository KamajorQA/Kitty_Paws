import { useAppSelector } from './reduxHooks';

function useUserInfo() {
  const { email, displayName, id } = useAppSelector(
    (state) => state.userReducer
  );

  return {
    email,
    displayName,
    id,
  };
}

export { useUserInfo };
