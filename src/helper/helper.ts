import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_API;
console.log('Base URL:', baseURL);

if (!baseURL) {
  throw new Error('VITE_BASE_URL is not defined in environment variables');
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
});