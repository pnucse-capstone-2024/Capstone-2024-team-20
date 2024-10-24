import axios from 'axios';
import { getAccessToken } from '../utils/token';

interface BuyMerchandise {
  name: string;
  price: number;
  eventName: string;
}

export function buyMerchandises(namespace: string, merchandises: BuyMerchandise[]) {
  return axios.post(`/${namespace}/merch/buy`, {
    merches: merchandises,
  }, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
