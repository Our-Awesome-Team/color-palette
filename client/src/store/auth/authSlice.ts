import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from './authTypes';
import authService from '../../services/authService';

// Get user from localStorage
// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'));

export type AuthState = {
  user: User | null;
  error: string | null;
  success: boolean;
  loading: boolean;
};

const initialState: AuthState = {
  user: user ? user : null,
  error: null,
  success: false,
  loading: false,
};

// Signup user
export const signup = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/signup', async (user, { rejectWithValue }) => {
  try {
    if (user) {
      return await authService.signup(user);
    }
    return rejectWithValue('Something went wrong');
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

// Signin user
export const signin = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/signin', async (user, { rejectWithValue }) => {
  try {
    if (user) {
      return await authService.signin(user);
    }
    return rejectWithValue('Something went wrong');
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
