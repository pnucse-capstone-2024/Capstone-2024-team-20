export interface ReservedTicket {
  eventTime: string;
  purchaseDate: string;
  purchaseTime: string;
  seatNumber: number;
  eventName: string;
  price: number;
  section: string;
  tid: string;
  namespace: string;
}

export interface Merchandise {
  name: string;
  price: number;
  image: string;
  eventName: string;
}

export interface ReservedMerchandise {
  name: string;
  price: number;
  image: string;
  count: number;
}

export type TabType = 'ticket' | 'merchandise';
