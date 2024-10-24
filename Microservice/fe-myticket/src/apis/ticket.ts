import axios from 'axios';
import { getAccessToken } from '../utils/token';
import { ReservedTicket } from '../utils/type';
import { myTicketInstance } from './instance';

export function getMyTickets() {
  return myTicketInstance.get('/my/all', {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}

export function refundTicket({
  ticket,
  namespace,
}:{
  ticket: ReservedTicket;
  namespace: string;
}) {
  return axios.delete(`/${namespace}/ticket/refund`, {
    data: [ticket],
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
