import axios from 'axios';
import { getAccessToken } from '../utils/token';
import { TicketBuy } from '../utils/type';

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
  tickets: TicketBuy[];
}) {
  return axios.post(`/${namespace}/seat/buy`, {
    seats: tickets,
  }, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
