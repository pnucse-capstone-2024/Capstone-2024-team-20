import { useContext } from 'react';
import { TicketContext } from '../stores/ticket';
import { Ticket } from '../utils/type';

export default function useTicket() {
  return useContext<Ticket[]>(TicketContext);
}
