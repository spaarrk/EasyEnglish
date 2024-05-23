import { $host } from '.';

export const createProgress = async (payload) => {
  const { data } = await $host.post(`api/statistics/progress`, payload);
  return data;
};

export const getDashboard = async (payload) => {
  const { data } = await $host.post(`api/statistics/dashboard`, payload);
  return data;
};
