import { useContext } from 'react';
import { TicketDispatchContext } from '../stores/ticket';
import { TicketAction } from '../utils/type';

export default function useTicketDispatch() {
  return useContext<React.Dispatch<TicketAction>>(TicketDispatchContext);
}
