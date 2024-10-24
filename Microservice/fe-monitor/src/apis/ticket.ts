import axios from 'axios';
import { getAccessToken } from '../utils/token';

export function getPlayMonitorData(namespace: string) {
  return axios.get(`/${namespace}/ticket/all`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
