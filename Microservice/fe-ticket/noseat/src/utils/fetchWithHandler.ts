import { AxiosResponse } from 'axios';

export const fetchWithHandler = async <T>(
  fetchFn: () => Promise<AxiosResponse<T>>,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (response?: AxiosResponse<T>) => void;
    onError: (error?: unknown) => void;
  },
) => {
  try {
    const response = await fetchFn();
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};
