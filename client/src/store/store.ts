import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/auth/authSlice';
import favoritesReducer from './favorites/favoritesSlice';
import historyReducer from './history/historySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    history: historyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
