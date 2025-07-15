import { State, StateDetail } from '@/types/types';
import axios from 'axios';

const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });

export const getStates = async () => {
  const response = await api.get<{ data: State[] }>('/countytest/states.json');
  return response.data;
};

export const getStateDetails = async (detailUrl: string) => {
  const response = await api.get<{ data: StateDetail[] }>(detailUrl);
  return response.data;
};
