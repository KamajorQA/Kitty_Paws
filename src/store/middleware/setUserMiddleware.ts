import { Dispatch, Middleware, MiddlewareAPI, Action } from '@reduxjs/toolkit';

interface EffectAction extends Action {
  effect<T>(action: T): void;
}

export const setUserMiddleware: Middleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<EffectAction>) =>
  (action: EffectAction) => {
    if (
      action.type === 'user/setUser' &&
      !!store.getState().userReducer.displayName.length
    ) {
      //eslint-disable-next-line no-console
      console.log(
        `Текущий пользователь: Уважаемый, ${
          store.getState().userReducer.displayName
        }`
      );
    }

    return next(action);
  };
