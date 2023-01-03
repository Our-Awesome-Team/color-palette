import axios from 'axios';
import { Query } from '../store/history/historyTypes.js';

const HISTORY_API_URL = 'http://localhost:5000/api/history/';

// Add new history item
const addHistoryItem = async (query: Query, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(HISTORY_API_URL, query, config);
  return response.data;
};

// Get user history
const getHistory = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(HISTORY_API_URL, config);

  return response.data;
};

// Delete user history item
const deleteHistoryItem = async (historyItemId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(HISTORY_API_URL + historyItemId, config);

  return response.data;
};

// Delete user history
const deleteHistory = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(HISTORY_API_URL, config);

  return response.data;
};

const favoritesService = {
  addHistoryItem,
  getHistory,
  deleteHistoryItem,
  deleteHistory,
};

export default favoritesService;
