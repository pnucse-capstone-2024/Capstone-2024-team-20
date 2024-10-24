import axios from 'axios';

export const envInstance = axios.create({
  baseURL: '/deploy/env',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
