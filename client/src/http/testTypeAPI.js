import { $host } from './index';

export const findAllTestType = async () => {
  const { data } = await $host.get('api/testType');
  return data;
};
