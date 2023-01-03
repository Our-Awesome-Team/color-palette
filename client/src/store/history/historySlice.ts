import {
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import historyService from '../../services/historyService';
import { AuthState } from '../auth/authSlice';
import { Query } from './historyTypes';

type HistoryState = {
  queries: Query[];
  error: string | null;
  success: boolean;
  loading: boolean;
};

const initialState: HistoryState = {
  queries: [],
  error: null,
  success: false,
  loading: false,
};

// Add new history item
export const addHistoryItem = createAsyncThunk<
  Query,
  Query,
  { rejectValue: string; state: { auth: AuthState } }
>('history/create', async (historyItem, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user?.token;
    if (token) {
      return await historyService.addHistoryItem(historyItem, token);
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

// Get user history
export const getHistory = createAsyncThunk<
  Query[],
  void,
  { rejectValue: string; state: { auth: AuthState } }
>('history/getAll', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user?.token;
    if (token) {
      return await historyService.getHistory(token);
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

// Delete user history item
export const deleteHistoryItem = createAsyncThunk<
  Query,
  string,
  { rejectValue: string; state: { auth: AuthState } }
>('historyItem/delete', async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user?.token;
    if (token) {
      return await historyService.deleteHistoryItem(id, token);
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

// Delete user history
export const deleteHistory = createAsyncThunk<
  void,
  void,
  { rejectValue: string; state: { auth: AuthState } }
>('history/delete', async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user?.token;
    if (token) {
      return await historyService.deleteHistory(token);
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

export const historySlice = createSlice({
  name: 'history',
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
      .addCase(addHistoryItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHistoryItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.queries.push(action.payload);
      })
      .addCase(getHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.queries = action.payload;
      })
      .addCase(deleteHistoryItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHistoryItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.queries = state.queries.filter(
          (query) => query.id !== action.payload.id
        );
      })
      .addCase(deleteHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.queries = [];
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      });
  },
});

export const { reset } = historySlice.actions;
export default historySlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
