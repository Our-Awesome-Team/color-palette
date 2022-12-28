import axios from 'axios';
import { FavoriteColor } from './favoriteColorTypes';

const API_URL = 'http://localhost:5000/api/favoriteColors/';

// Save new favorite color
const saveFavoriteColor = async (
  favoriteColorData: FavoriteColor,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, favoriteColorData, config);
  return response.data;
};

// Get user favorite colors
const getFavoriteColors = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user favorite color
const deleteFavoriteColor = async (favoriteColorId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + favoriteColorId, config);

  return response.data;
};

const favoriteColorlService = {
  saveFavoriteColor,
  getFavoriteColors,
  deleteFavoriteColor,
};

export default favoriteColorlService;
