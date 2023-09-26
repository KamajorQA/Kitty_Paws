import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slices/userSlice';
import { catsApi } from './services/catsApi';

const store = configureStore({
  reducer: {
    userReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { store };
