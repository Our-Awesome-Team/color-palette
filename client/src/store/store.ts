import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/auth/authSlice';
import favoriteColorReducer from './favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favoriteColors: favoriteColorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
