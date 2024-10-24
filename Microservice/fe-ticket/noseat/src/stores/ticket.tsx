import { createContext, ReactNode, useReducer } from 'react';
import { TicketAction } from '../utils/type';

function reducer(state: Map<string, number>, action: TicketAction) {
  const { type, payload } = action;
  switch (type) {
    case 'INIT': {
      const newMap = new Map(state);
      newMap.set(`${payload.eventTime}#${payload.section}`, 0);

      return newMap;
    }

    case 'ADD': {
      const key = `${payload.eventTime}#${payload.section}`;
      const newMap = new Map(state);
      newMap.set(key, newMap.get(key) + 1);

      return newMap;
    }

    case 'REMOVE': {
      const key = `${payload.eventTime}#${payload.section}`;
      const newMap = new Map(state);
      const prev = newMap.get(key);
      if (prev > 0) {
        newMap.set(key, prev - 1);
      }

      return newMap;
    }

    default:
      return state;
  }
}

export const TicketContext = createContext(null);
export const TicketDispatchContext = createContext(null);

export default function TicketProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, new Map());

  return (
    <TicketContext.Provider value={state}>
      <TicketDispatchContext.Provider value={dispatch}>
        {children}
      </TicketDispatchContext.Provider>
    </TicketContext.Provider>
  );
}
