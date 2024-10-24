import { AxiosResponse } from 'axios';
import { ResponseData } from '../utils/type';
import { monitorInstance } from './instance';

interface RangeQueryParams {
  namespace: string;
  metric: string;
  start: number;
  end: number;
  step: string;
}

export function rangeQuery({
  namespace,
  metric,
  start,
  end,
  step,
}: RangeQueryParams): Promise<AxiosResponse<ResponseData[]>> {
  return monitorInstance.get(`/range_query?namespace=${namespace}&metric=${metric}&start=${start}&end=${end}&step=${step}`);
}
