export interface Metric {
  name: string;
  values: [number, number][];
}

export interface ResponseData {
  metric: {
    pod: string;
  },
  values: [number, string][];
}

export interface Seat {
  id: number;
  section: string;
  count: number
}
