import axios from 'axios';

export const myTicketInstance = axios.create({
  baseURL: '/default/ticket',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
