import { $host } from './index';

export const findAll = async () => {
  const { data } = await $host.get('api/sTopic');
  return data;
};

export const fetchCardsList = async (filters) => {
  const { data } = await $host.post('api/test/cardsList', filters);
  console.log('data = ', data);
  return data;
};
