import {
  configureStore,
  ThunkAction,
  Action,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import favoriteColorReducer from '../services/favoriteColor/favoriteColorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favoriteColors: favoriteColorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
