export interface Ticket {
  eventName: string;
  section: string;
  seatNumber: number;
  price: number;
  eventTime: string;
}
export interface TicketBuy {
  eventName: string;
  section: string;
  price: number;
  eventTime: string;
}

export interface TicketAction {
  type: 'ADD' | 'REMOVE';
  payload: Ticket;
}

export interface SeatsAndPrices {
  id: number;
  section: string;
  price: number;
  count: number;
}

export interface PlayDescription {
  id: number;
  text: string[];
  image: string;
}

export interface Merch {
  id: number;
  name: string;
  price: number;
  count: number;
  image: string;
}

export interface TicketingPlayDetail {
  id: number;
  name: string;
  image: string;
  cast: string;
  description: PlayDescription;
  venue: string;
  seatsAndPrices: SeatsAndPrices[];
  eventTime: string[];
  startDate: string;
  endDate: string;
  bookingStartDate: string;
  bookingEndDate: string;
  merches: Merch[];
}

export interface SeatInfo {
  id: string;
  eventName: string;
  section: string;
  seatNumber: number;
  price: number;
  reservationStatus: 'YES' | 'NO';
  eventTime: string;
}

export interface ReservedTicket {
  id: number;
  seatNumber: number;
  eventName: string;
  section: string;
}

export interface Seat {
  x: number;
  y: number;
}

export interface Section {
  sectionName: string;
  seats: Seat[];
}

export interface Venue {
  name: string;
  backgroundImage: string;
  imageSize: {
    width: number;
    height: number;
  }
  sections: Section[];
}

export interface Merchandise {
  image: string;
  name: string;
  namespace: string;
  price: number;
  count: number;
}

export type Tab = 'info' | 'ticket' | 'merchandise';
