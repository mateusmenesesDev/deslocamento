const baseRevalidateUrl = '/api/revalidate?path=';

export const revalidate = {
  clients: async () => {
    await fetch(`${baseRevalidateUrl}/clientes`);
  },
  conductor: async () => await fetch(`${baseRevalidateUrl}/condutores`),
  veicules: async () => await fetch(`${baseRevalidateUrl}/veiculos`)
};
