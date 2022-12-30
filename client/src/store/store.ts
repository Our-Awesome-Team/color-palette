import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/auth/authSlice';
import favoritesReducer from './favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
