import axios from 'axios';

export const poolInstance = axios.create({
  baseURL: '/pool',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const templateInstance = axios.create({
  baseURL: '/template',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
