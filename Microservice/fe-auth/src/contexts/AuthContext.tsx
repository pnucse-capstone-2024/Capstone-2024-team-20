import { createContext } from 'react';
import { Auth } from '../utils/type';

export const AuthContext = createContext<{
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  loading: boolean;
}>({
  auth: null,
  setAuth: null,
  loading: true,
});
