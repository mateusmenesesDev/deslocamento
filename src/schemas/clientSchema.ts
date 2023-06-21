import { z } from 'zod';

const baseClientSchema = z.object({
  id: z.number().optional(),
  nome: z.string().nonempty('Insira o nome do cliente'),
  cidade: z.string().nonempty('Informe a cidade do cliente'),
  bairro: z.string().nonempty('Informe o bairro do cliente'),
  logradouro: z.string().nonempty('Informe a rua do cliente'),
  numero: z.string().nonempty('Informe o número da casa'),
  uf: z.string().nonempty('Informe o estado do cliente')
});

export const newClientSchema = z.object({
  id: z.number().optional(),
  nome: z.string().nonempty('Insira o nome do cliente'),
  numeroDocumento: z.string().optional(),
  tipoDocumento: z.string().optional(),
  cidade: z.string().nonempty('Informe a cidade do cliente'),
  bairro: z.string().nonempty('Informe o bairro do cliente'),
  logradouro: z.string().nonempty('Informe a rua do cliente'),
  numero: z.string().nonempty('Informe o número da casa'),
  uf: z.string().nonempty('Informe o estado do cliente')
});

export const editClientSchema = z.object({
  id: z.number(),
  nome: z.string().nonempty('Insira o nome do cliente'),
  cidade: z.string().nonempty('Informe a cidade do cliente'),
  bairro: z.string().nonempty('Informe o bairro do cliente'),
  logradouro: z.string().nonempty('Informe a rua do cliente'),
  numero: z.string().nonempty('Informe o número da casa'),
  uf: z.string().nonempty('Informe o estado do cliente')
});

export type EditClient = z.infer<typeof editClientSchema>;
export type Client = z.infer<typeof newClientSchema>;
