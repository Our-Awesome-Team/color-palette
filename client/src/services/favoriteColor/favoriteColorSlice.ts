import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import favoriteColorService from './favoriteColorlService';
import { AppDispatch } from '../../redux/store';
import { FavoriteColor } from './favoriteColorTypes';

type InitialState = {
  favoriteColors: FavoriteColor[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: InitialState = {
  favoriteColors: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new goal
export const saveFavoriteColor = createAsyncThunk(
  'favoriteColors/create',
  async (favoriteColorData: FavoriteColor, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.user.token;
      return await favoriteColorService.saveFavoriteColor(
        favoriteColorData,
        token
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user goals
export const getFavoriteColors = createAsyncThunk(
  'favoriteColors/getAll',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI && thunkAPI.getState().auth.user.token;
      return await favoriteColorService.getFavoriteColors(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user goal
export const deleteFavoriteColor = createAsyncThunk(
  'favoriteColors/delete',
  async (id: any, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.user.token;
      return await favoriteColorService.deleteFavoriteColor(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const favoriteColorSlice = createSlice({
  name: 'favoriteColor',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFavoriteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveFavoriteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoriteColors.push(action.payload);
      })
      .addCase(saveFavoriteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getFavoriteColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavoriteColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoriteColors = action.payload;
      })
      .addCase(getFavoriteColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteFavoriteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFavoriteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoriteColors = state.favoriteColors.filter(
          (favoriteColor) => favoriteColor.id !== action.payload.id
        );
      })
      .addCase(deleteFavoriteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = favoriteColorSlice.actions;
export default favoriteColorSlice.reducer;
