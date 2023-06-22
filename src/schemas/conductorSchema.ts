import { z } from 'zod';

export const newConductorSchema = z.object({
  id: z.number().optional(),
  nome: z.string().nonempty('Insira o nome do cliente'),
  numeroHabilitacao: z
    .string()
    .nonempty('Insira o número de habilitação do condutor'),
  categoriaHabilitacao: z
    .string()
    .nonempty('Insira a categória da habilitação do condutor'),
  vencimentoHabilitacao: z
    .string()
    .nonempty('Informe o vencimento da habilitação do condutor')
});

export type TConductor = z.infer<typeof newConductorSchema>;
