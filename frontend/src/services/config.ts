export const API_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_SERVER_PRODUCTION
  : import.meta.env.VITE_SERVER_DEVELOPMENT;


  console.log(import.meta.env.MODE)
  console.log('API_URL:', API_URL);