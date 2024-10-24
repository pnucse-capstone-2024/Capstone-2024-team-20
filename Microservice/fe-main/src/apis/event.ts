import axios from 'axios';
import { envInstance } from './instance';

export function getEvent(namespace: string) {
  return axios.get(`/${namespace}/event`);
}

export function getNamespaceList() {
  return envInstance.get('/listAll');
}
