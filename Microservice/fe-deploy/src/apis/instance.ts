import axios from 'axios';

export const deployInstance = axios.create({
  baseURL: '/deploy',
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventInstance = axios.create({
  baseURL: '/event',
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

export const ticketInstance = axios.create({
  baseURL: '/ticket',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
