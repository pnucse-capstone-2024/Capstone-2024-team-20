import axios from 'axios';
import { getAccessToken } from '../utils/token';

export function getEvent(namespace: string) {
  return axios.get(`/${namespace}/event`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
