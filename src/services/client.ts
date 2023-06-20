import { IClient } from '../typings/clients';

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
  updateById: async (payload: IClient) => {
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
      return request;
    } catch (err) {
      console.log(err);
    }
    // console.log('🚀 ~ file: client.ts:26 ~ deleteById: ~ teste:', teste);
  },
  createNew: async (payload: IClient) => {
    console.log('🚀 ~ file: client.ts:38 ~ createNew: ~ payload:', payload);
    console.log(
      '🚀 ~ file: client.ts:38 ~ createNew: ~ payload:',
      JSON.stringify(payload)
    );
    try {
      const request = await fetch(`${baseUrl}/api/v1/Cliente`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(payload)
      });
      console.log('🚀 ~ file: client.ts:42 ~ createNew: ~ request:', request);
      return request;
    } catch (err) {
      console.log(err);
    }
  }
};
