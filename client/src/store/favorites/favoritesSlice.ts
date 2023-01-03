import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Color, Scheme } from './favoritesTypes';
import favoritesService from '../../services/favoritesService';
import { AuthState } from '../auth/authSlice';

type FavoritesState = {
  favoriteColors: Color[];
  favoriteSchemes: Scheme[];
  error: string | null;
  success: boolean;
  loading: boolean;
};

const initialState: FavoritesState = {
  favoriteColors: [],
  favoriteSchemes: [],
  error: null,
  success: false,
  loading: false,
};

// Add new favorite color
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
        return await favoritesService.AddFavoriteColor(favoriteColor, token);
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

// Add new favorite scheme
export const addFavoriteScheme = createAsyncThunk<
  Scheme,
  Scheme,
  { rejectValue: string; state: { auth: AuthState } }
>(
  'favoriteSchemes/create',
  async (favoriteScheme, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user?.token;
      if (token) {
        return await favoritesService.AddFavoriteScheme(favoriteScheme, token);
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
      return await favoritesService.getFavoriteColors(token);
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

// Get user favorite schemes
export const getFavoriteSchemes = createAsyncThunk<
  Scheme[],
  void,
  { rejectValue: string; state: { auth: AuthState } }
>('favoriteSchemes/getAll', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user?.token;
    if (token) {
      return await favoritesService.getFavoriteSchemes(token);
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
      return await favoritesService.deleteFavoriteColor(id, token);
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

// Delete user favorite scheme
export const deleteFavoriteScheme = createAsyncThunk<
  Scheme,
  number,
  { rejectValue: string; state: { auth: AuthState } }
>('favoriteSchemes/delete', async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user?.token;
    if (token) {
      return await favoritesService.deleteFavoriteScheme(id, token);
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

export const favoritesSlice = createSlice({
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
      .addCase(addFavoriteScheme.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavoriteScheme.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.favoriteSchemes.push(action.payload);
      })
      .addCase(getFavoriteColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavoriteColors.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.favoriteColors = action.payload;
      })
      .addCase(getFavoriteSchemes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavoriteSchemes.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.favoriteSchemes = action.payload;
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
      .addCase(deleteFavoriteScheme.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFavoriteScheme.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.favoriteSchemes = state.favoriteSchemes.filter(
          (favoriteScheme) => favoriteScheme.id !== action.payload.id
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      });
  },
});

export const { reset } = favoritesSlice.actions;
export default favoritesSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
