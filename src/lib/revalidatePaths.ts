const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
const baseRevalidateUrl = `${baseUrl}/api/revalidate?path=`;

export const revalidate = {
  clients: async () => {
    console.log('🚀 ~ file: revalidatePaths.ts:2 ~ baseUrl:', baseUrl);
    await fetch('/api/revalidate?path=/clientes');
  },
  drivers: async () => await fetch(`${baseRevalidateUrl}/condutores`),
  veicules: async () => await fetch(`${baseRevalidateUrl}/veiculos`)
};
