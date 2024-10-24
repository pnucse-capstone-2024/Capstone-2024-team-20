import axios from 'axios';

const serverURL = 'http://cse.ticketclove.com';

export const eventInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? `${serverURL}/event` : '/event',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const seatInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? `${serverURL}/seat` : '/seat',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
