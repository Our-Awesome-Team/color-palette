import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/auth/authSlice';
import { favoritesApi } from './favorites/favoritesApi';
import { historyApi } from './history/historyApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(favoritesApi.middleware).concat(historyApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
