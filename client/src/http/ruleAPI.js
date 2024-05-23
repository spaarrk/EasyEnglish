import { $authHost, $host } from './index';

export const createRule = async (rule) => {
  const { data } = await $authHost.post('api/rule', rule);
  return data;
};

export const fetchRule = async () => {
  const { data } = await $host.get('api/rule');
  return data;
};

export const fetchOneRule = async (id) => {
  const { data } = await $host.get('api/rule/' + id);
  return data;
};

export const deleteRuleApi = async (idRule) => {
  const { data } = await $host.delete(`api/rule/${idRule}`);
  return data;
};

export const updateRuleApi = async (idRule, payload) => {
  const { data } = await $host.put(`api/rule/${idRule}`, payload);
  return data;
};
