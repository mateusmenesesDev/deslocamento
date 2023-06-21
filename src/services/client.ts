import { Client } from '../schemas/clientSchema';

const baseUrl = 'https://api-deslocamento.herokuapp.com';

export const clientRequests = {
  findAll: async () => {
    const request = fetch(`${baseUrl}/api/v1/Cliente`);
    return (await request).json();
  },

  findById: async (id: number) => {
    const request = fetch(`${baseUrl}/api/v1/Cliente/${id}`);
    return (await request).json();
  },

  updateById: async (payload: Client) => {
    delete payload.numeroDocumento;
    delete payload.tipoDocumento;
    await fetch(`${baseUrl}/api/v1/Cliente/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({ 'content-type': 'application/json' })
    });
  },

  deleteById: async (id: number) => {
    console.log('🚀 ~ file: client.ts:24 ~ deleteById: ~ id:', id);
    try {
      const request = await fetch(`${baseUrl}/api/v1/Cliente/${id}`, {
        method: 'DELETE',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ id })
      });
      if (request.status === 400) {
        console.log('entrei aqui');
        throw new Error('Algo deu errado no servidor!');
      }
      return request;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  createNew: async (payload: Client) => {
    try {
      const request = await fetch(`${baseUrl}/api/v1/Cliente`, {
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
