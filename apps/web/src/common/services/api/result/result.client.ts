import axios from 'axios';
import type { ResultResponseDto } from './result.type';
import { getEndpointSet } from '../endpoints';

const resultClient = axios.create();

export const getResult = async (id: string = '0'): Promise<ResultResponseDto> => {
  const { url, method } = getEndpointSet('API', 'GET_RESULT', { id });
  const response = await resultClient.request<ResultResponseDto>({ url, method });

  return response.data;
};
