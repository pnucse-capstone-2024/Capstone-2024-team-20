import axios from 'axios';
import { getAccessToken } from '../utils/token';
import { Ticket } from '../utils/type';

export function getSeats(namespace: string) {
  return axios.get(`/${namespace}/seat`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}

export function buySeats({
  namespace,
  tickets,
}: {
  namespace: string;
  tickets: Ticket[];
}) {
  return axios.post(`/${namespace}/seat/buy`, {
    seats: tickets,
  }, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
