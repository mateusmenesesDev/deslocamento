import { IClient } from '../typings/clients';

const baseUrl = 'https://api-deslocamento.herokuapp.com';

export const clientRequests = {
  findAll: async () => {
    const request = fetch(`${baseUrl}/api/v1/Cliente`, { cache: 'no-store' });
    return (await request).json();
  },
  findById: async (id: number) => {
    const request = fetch(`${baseUrl}/api/v1/Cliente/${id}`);
    return (await request).json();
  },
  updateById: async (id: number | string, payload: IClient) => {
    console.log('🚀 ~ file: client.ts:15 ~ updateById: ~ payload:', payload);
    delete payload.numeroDocumento;
    delete payload.tipoDocumento;
    await fetch(`${baseUrl}/api/v1/Cliente/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({ 'content-type': 'application/json' })
    });
  }
};
