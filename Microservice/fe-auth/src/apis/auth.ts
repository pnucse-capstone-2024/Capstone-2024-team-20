import { AxiosResponse } from 'axios';
import { authInstance } from './instance';
import { LoginResponse, SignUpResponse } from '../utils/type';

interface SignupParams {
  email: string;
  password: string;
  userType: 'CLIENT' | 'PROVIDER';
}

interface LoginParams {
  email: string;
  password: string;
}

export async function signUp({
  email,
  password,
  userType,
}: SignupParams): Promise<AxiosResponse<SignUpResponse>> {
  return authInstance.post('/signup', {
    email,
    password,
    authority: userType,
  });
}

export async function login({
  email,
  password,
}: LoginParams): Promise<AxiosResponse<LoginResponse>> {
  return authInstance.post('/login', {
    email, password,
  });
}

export async function logout() {
  return authInstance.post('/logout');
}
