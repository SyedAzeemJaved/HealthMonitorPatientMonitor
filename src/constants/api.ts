const API_BASE_URL = 'https://health-mon-api-production.up.railway.app';

export const constants = {
  TOKEN: `${API_BASE_URL}/token`,
  ME: `${API_BASE_URL}/common/me`,

  HISTORY: `${API_BASE_URL}/current/history`,

  RESULTS_PER_PAGE: 7,
};
