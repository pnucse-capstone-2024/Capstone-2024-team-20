import { LoginResponse } from './type';

export function getExistToken() {
  return localStorage.getItem('accessToken');
}

export function getTokenExpireDate() {
  return Number(localStorage.getItem('accessTokenExpiresIn'));
}

export function setToken({ grantType, accessToken, accessTokenExpiresIn }: LoginResponse) {
  localStorage.setItem('accessToken', `${grantType} ${accessToken}`);
  localStorage.setItem('accessTokenExpiresIn', accessTokenExpiresIn.toString());
}
