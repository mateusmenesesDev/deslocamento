const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
const secret = process.env.MY_SECRET_TOKEN_REVALIDATION;
const baseRevalidateUrl = `${baseUrl}/api/revalidate?path=`;

export const revalidate = {
  clients: async () => {
    console.log('🚀 ~ file: revalidatePaths.ts:3 ~ secret:', secret);
    await fetch(`${baseRevalidateUrl}/clientes`);
  },
  drivers: async () => await fetch(`${baseRevalidateUrl}/condutores`),
  veicules: async () => await fetch(`${baseRevalidateUrl}/veiculos`)
};
