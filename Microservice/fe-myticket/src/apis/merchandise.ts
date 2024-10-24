import axios from 'axios';
import { getAccessToken } from '../utils/token';

export function getMyMerchandise() {
  return axios.get('/default/merch/byEmail', {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
