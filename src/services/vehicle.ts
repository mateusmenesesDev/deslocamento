import { TVehicle } from '../schemas/vehicleSchema';

const baseUrl = 'https://api-deslocamento.herokuapp.com/api/v1/Veiculo';

export const vehicleRequest = {
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

  updateById: async (payload: TVehicle) => {
    await fetch(`${baseUrl}/${payload.id}`, {
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
        console.log('entrei aqui');
        throw new Error('Algo deu errado no servidor!');
      }
      return request;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
  },

  createNew: async (payload: TVehicle) => {
    try {
      const request = await fetch(baseUrl, {
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
