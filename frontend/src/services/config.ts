export const API_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_SERVER_PRODUCTION
  : import.meta.env.VITE_SERVER_DEVELOPMENT;