import { AxiosResponse } from 'axios';
import { LoginResponse } from '../utils/type';
import { authInstance } from './instance';

interface ReissueParams {
  accessToken: string;
}

export async function reissue({
  accessToken,
}: ReissueParams): Promise<AxiosResponse<LoginResponse>> {
  return authInstance.post('/reissue', {
    accessToken,
  });
}
