import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slices/userSlice';
import { catsApi } from './services/catsApi';
import { setUserMiddleware } from './middleware/setUserMiddleware';

const store = configureStore({
  reducer: {
    userReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware).concat(setUserMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { store };
