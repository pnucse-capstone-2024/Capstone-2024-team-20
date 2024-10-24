export interface Ticket {
  eventName: string;
  section: string;
  seatNumber: number;
  price: number;
  eventTime: string;
  count: number;
}

export interface TicketBuy {
  eventName: string;
  section: string;
  price: number;
  eventTime: string;
}

export interface TicketAction {
  type: 'INIT' | 'ADD' | 'REMOVE';
  payload: {
    eventTime: string;
    section: string;
  };
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
}

export interface SeatInfo {
  eventName: string;
  section: string;
  price: number;
  eventTime: string;
}

export interface ReservedTicket {
  id: number;
  seatNumber: number;
  eventName: string;
  section: string;
}

export interface Venue {
  name: string;
  backgroundImage: string;
  imageSize: {
    width: number;
    height: number;
  }
  sections: string[];
}
