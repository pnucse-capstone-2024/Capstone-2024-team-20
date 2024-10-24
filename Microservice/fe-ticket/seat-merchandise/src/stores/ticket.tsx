import { createContext, ReactNode, useReducer } from 'react';
import { Ticket, TicketAction } from '../utils/type';

function reducer(state: Ticket[], action: TicketAction) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD':
      if (state.find((s) => s.eventName === payload.eventName
        && s.seatNumber === payload.seatNumber
        && s.section === payload.section
        && s.eventTime === payload.eventTime) === undefined) {
        return [...state, payload];
      }
      return state;

    case 'REMOVE':
      return state.filter(
        (s) => !(s.eventName === payload.eventName
          && s.seatNumber === payload.seatNumber
          && s.section === payload.section
          && s.eventTime === payload.eventTime),
      );

    default:
      return state;
  }
}

export const TicketContext = createContext(null);
export const TicketDispatchContext = createContext(null);

export default function TicketProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <TicketContext.Provider value={state}>
      <TicketDispatchContext.Provider value={dispatch}>
        {children}
      </TicketDispatchContext.Provider>
    </TicketContext.Provider>
  );
}
