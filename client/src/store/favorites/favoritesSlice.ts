import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Color } from './favoritesTypes';
import favoriteColorService from '../../services/favoritesService';
import { AuthState } from '../auth/authSlice';

type FavoritesState = {
  favoriteColors: Color[];
  error: string | null;
  success: boolean;
  loading: boolean;
};

const initialState: FavoritesState = {
  favoriteColors: [],
  error: null,
  success: false,
  loading: false,
};

// Create new favorite color
export const addFavoriteColor = createAsyncThunk<
  Color,
  Color,
  { rejectValue: string; state: { auth: AuthState } }
>(
  'favoriteColors/create',
  async (favoriteColor, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user?.token;
      if (token) {
        return await favoriteColorService.saveFavoriteColor(
          favoriteColor,
          token
        );
      }
      return rejectWithValue('No token provided');
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Get user favorite colors
export const getFavoriteColors = createAsyncThunk<
  Color[],
  void,
  { rejectValue: string; state: { auth: AuthState } }
>('favoriteColors/getAll', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user?.token;
    if (token) {
      return await favoriteColorService.getFavoriteColors(token);
    }
    return rejectWithValue('You are not authorized');
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

// Delete user favorite color
export const deleteFavoriteColor = createAsyncThunk<
  Color,
  number,
  { rejectValue: string; state: { auth: AuthState } }
>('favoriteColors/delete', async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user?.token;
    if (token) {
      return await favoriteColorService.deleteFavoriteColor(id, token);
    }
    return rejectWithValue('No token provided');
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const favoriteColorSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavoriteColor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.favoriteColors.push(action.payload);
      })
      .addCase(getFavoriteColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavoriteColors.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.favoriteColors = action.payload;
      })
      .addCase(deleteFavoriteColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFavoriteColor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.favoriteColors = state.favoriteColors.filter(
          (favoriteColor) => favoriteColor.id !== action.payload.id
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = favoriteColorSlice.actions;
export default favoriteColorSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
