import axios from 'axios';
import { Color, Scheme } from '../store/favorites/favoritesTypes';

const COLOR_API_URL = 'http://localhost:5000/api/favoriteColors/';
const SCHEME_API_URL = 'http://localhost:5000/api/favoriteSchemes/';

// Add new favorite color
const AddFavoriteColor = async (favoriteColorData: Color, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(COLOR_API_URL, favoriteColorData, config);
  return response.data;
};

// Add new favorite scheme
const AddFavoriteScheme = async (favoriteSchemeData: Scheme, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(SCHEME_API_URL, favoriteSchemeData, config);
  return response.data;
};

// Get user favorite colors
const getFavoriteColors = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(COLOR_API_URL, config);

  return response.data;
};

// Get user favorite schemes
const getFavoriteSchemes = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(SCHEME_API_URL, config);

  return response.data;
};

// Delete user favorite color
const deleteFavoriteColor = async (favoriteColorId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(COLOR_API_URL + favoriteColorId, config);

  return response.data;
};

// Delete user favorite scheme
const deleteFavoriteScheme = async (
  favoriteSchemeId: number,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    SCHEME_API_URL + favoriteSchemeId,
    config
  );

  return response.data;
};

const favoritesService = {
  AddFavoriteColor,
  AddFavoriteScheme,
  getFavoriteColors,
  getFavoriteSchemes,
  deleteFavoriteColor,
  deleteFavoriteScheme,
};

export default favoritesService;
