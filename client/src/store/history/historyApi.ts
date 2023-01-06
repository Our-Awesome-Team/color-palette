import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { IHistoryItem } from './historyTypes';

export const historyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  reducerPath: 'historyApi',
  tagTypes: ['History'],
  endpoints: (build) => ({
    getHisotory: build.query<IHistoryItem[], void>({
      query: () => `/history`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'History', id }))
          : ['History'],
    }),
    addHistoryItem: build.mutation({
      query: (body) => ({
        url: '/history',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['History'],
    }),
    removeHistory: build.mutation<void, void>({
      query: () => ({
        url: `/history`,
        method: 'DELETE',
      }),
      invalidatesTags: ['History'],
    }),
  }),
});

export const {
  useGetHisotoryQuery,
  useAddHistoryItemMutation,
  useRemoveHistoryMutation,
} = historyApi;
