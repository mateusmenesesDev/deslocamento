const baseRevalidateUrl = '/api/revalidate?path=';

export const revalidate = {
  clients: async () => {
    await fetch(`${baseRevalidateUrl}/clientes`);
  },
  conductor: async () => await fetch(`${baseRevalidateUrl}/condutores`),
  vehicles: async () => await fetch(`${baseRevalidateUrl}/veiculos`),
  travel: async () => await fetch(`${baseRevalidateUrl}/deslocamentos`),
  dashboard: async () => await fetch(`${baseRevalidateUrl}/`)
};
