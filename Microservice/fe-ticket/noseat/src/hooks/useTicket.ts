import { useContext } from 'react';
import { TicketContext } from '../stores/ticket';

export default function useTicket() {
  return useContext<Map<string, number>>(TicketContext);
}
