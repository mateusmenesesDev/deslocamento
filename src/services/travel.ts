import { TTravel } from '../schemas/travelSchema';

const baseUrl = 'https://api-deslocamento.herokuapp.com/api/v1/Deslocamento';

export const travelRequest = {
  findAll: async () => {
    try {
      const request = await fetch(baseUrl);
      return await request.json();
    } catch (err) {
      return err;
    }
  },
  findById: async (id: number) => {
    const request = fetch(`${baseUrl}/${id}`);
    return (await request).json();
  },

  updateById: async (payload: TTravel) => {
    await fetch(`${baseUrl}/${payload.id}/EncerrarDeslocamento`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({ 'content-type': 'application/json' })
    });
  },

  deleteById: async (id: number) => {
    try {
      const request = await fetch(`${baseUrl}/${id}`, {
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

  createNew: async (payload: TTravel) => {
    try {
      const request = await fetch(`${baseUrl}/IniciarDeslocamento`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(payload)
      });
      return request;
    } catch (err) {
      console.log(err);
    }
  }
};
