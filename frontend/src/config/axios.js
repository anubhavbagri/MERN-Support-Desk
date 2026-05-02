import axios from 'axios';

// Create axios instance with base URL from environment variable
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

export default axiosInstance;
