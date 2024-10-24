import axios from 'axios';

export const authInstance = axios.create({
  baseURL: '/auth',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
