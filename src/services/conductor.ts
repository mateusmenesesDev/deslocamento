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
    await fetch(`${baseUrl}/api/v1/Condutor/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({ 'content-type': 'application/json' })
    });
  },

  deleteById: async (id: number) => {
    try {
      const request = await fetch(`${baseUrl}/api/v1/Condutor/${id}`, {
        method: 'DELETE',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ id })
      });
      if (request.status === 400) {
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
