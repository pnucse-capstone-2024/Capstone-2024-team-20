import axios from 'axios';

export const monitorInstance = axios.create({
  baseURL: '/monitor',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
