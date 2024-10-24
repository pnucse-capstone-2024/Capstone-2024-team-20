declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'auth/reissue' {
  import { AxiosResponse } from 'axios';
  import { LoginResponse } from './utils/type';

  export function reissue(params: { accessToken: string }): Promise<AxiosResponse<LoginResponse>>
}

declare module 'monitor/Monitor';
declare module 'monitor/PlayMonitor';
declare module 'monitor/SimplePlayMonitor';
