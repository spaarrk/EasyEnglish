import { $authHost, $host } from './index';

export const createGrammar = async (grammar) => {
  const { data } = await $authHost.post('api/grammar', grammar);
  return data;
};

export const fetchGrammar = async () => {
  const { data } = await $host.get('api/grammar');
  return data;
};
export const fetchOneGrammar = async (id) => {
  const { data } = await $host.get(`api/grammar/${id}`);
  return data;
};

export const deleteGrammarApi = async (idGrammar) => {
  const { data } = await $host.delete(`api/grammar/${idGrammar}`);
  return data;
};

export const updateGrammarApi = async (idGrammar, payload) => {
  const { data } = await $host.put(`api/grammar/${idGrammar}`, payload);
  return data;
};
