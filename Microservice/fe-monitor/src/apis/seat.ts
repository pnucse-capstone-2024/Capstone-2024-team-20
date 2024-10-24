import axios from 'axios';
import { getAccessToken } from '../utils/token';

export async function getSeat(namespace: string) {
  return axios.get(`/${namespace}/seat`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
