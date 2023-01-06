import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Color, Scheme } from './favoritesTypes';
import type { RootState } from '../store';

export const favoritesApi = createApi({
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
  reducerPath: 'favoritesApi',
  tagTypes: ['Colors', 'Schemes'],
  endpoints: (build) => ({
    getFavoriteColors: build.query<Color[], void>({
      query: () => `/favoriteColors`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Colors', id })) : ['Colors'],
    }),
    getFavoriteSchemes: build.query<Scheme[], void>({
      query: () => `/favoriteSchemes`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Schemes', id }))
          : ['Schemes'],
    }),
    addFavoriteColor: build.mutation({
      query: (body) => ({
        url: '/favoriteColors',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Colors'],
    }),
    addFavoriteScheme: build.mutation({
      query: (body) => ({
        url: '/favoriteSchemes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schemes'],
    }),
    removeFavoriteColor: build.mutation({
      query: (id) => ({
        url: `/favoriteColors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Colors'],
    }),
    removeFavoriteScheme: build.mutation({
      query: (id) => ({
        url: `/favoriteSchemes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schemes'],
    }),
  }),
});

export const {
  useGetFavoriteColorsQuery,
  useGetFavoriteSchemesQuery,
  useAddFavoriteColorMutation,
  useAddFavoriteSchemeMutation,
  useRemoveFavoriteColorMutation,
  useRemoveFavoriteSchemeMutation,
} = favoritesApi;
