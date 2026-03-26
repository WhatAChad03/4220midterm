const axios = require("axios");

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = "your_api_key_here"; // Replace with your RAWG API key from https://rawg.io/apidocs

/**
 * Searches the RAWG API for games matching the given keyword.
 * @param {string} keyword - The search term to query.
 * @returns {Promise<Array>} - Array of game result objects.
 */
const searchGames = async (keyword) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      search: keyword,
      page_size: 10,
    },
  });
  return response.data.results;
};

/**
 * Fetches detailed information for a single game by its unique ID.
 * @param {number|string} id - The RAWG game ID.
 * @returns {Promise<Object>} - Detailed game data object.
 */
const getGameById = async (id) => {
  const response = await axios.get(`${BASE_URL}/games/${id}`, {
    params: {
      key: API_KEY,
    },
  });
  return response.data;
};

module.exports = { searchGames, getGameById };