import { TConductor } from '../schemas/conductorSchema';

const baseUrl = 'https://api-deslocamento.herokuapp.com';

export const conductorRequest = {
  findAll: async () => {
    try {
      const request = await fetch(`${baseUrl}/api/v1/Condutor`);
      return await request.json();
    } catch (err) {
      return err;
    }
  },
  findById: async (id: number) => {
    const request = fetch(`${baseUrl}/api/v1/Condutor/${id}`);
    return (await request).json();
  },

  updateById: async (payload: TConductor) => {
    const driverEdit = {
      id: payload.id,
      categoriaHabilitacao: payload.catergoriaHabilitacao,
      vecimentoHabilitacao: payload.vencimentoHabilitacao
    };
    await fetch(`${baseUrl}/api/v1/Condutor/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(driverEdit),
      headers: new Headers({ 'content-type': 'application/json' })
    });
  },

  deleteById: async (id: number) => {
    console.log('🚀 ~ file: client.ts:24 ~ deleteById: ~ id:', id);
    try {
      const request = await fetch(`${baseUrl}/api/v1/Condutor/${id}`, {
        method: 'DELETE',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ id })
      });
      if (request.status === 400) {
        console.log('entrei aqui');
        throw new Error('Algo deu errado no servidor!');
      }
      return request;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
  },

  createNew: async (payload: TConductor) => {
    const newConductor = {
      nome: payload.nome,
      numeroHabilitacao: payload.numeroHabilitacao,
      categoriaHabilitacao: payload.catergoriaHabilitacao,
      vencimentoHabilitacao: payload.vencimentoHabilitacao
    };
    try {
      const request = await fetch(`${baseUrl}/api/v1/Condutor`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(newConductor)
      });
      return request;
    } catch (err) {
      console.log(err);
    }
  }
};
