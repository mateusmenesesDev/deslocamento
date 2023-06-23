import { z } from 'zod';

export const newConductorSchema = z.object({
  id: z.number().optional(),
  nome: z.string().nonempty('Insira o nome do cliente'),
  numeroHabilitacao: z
    .string()
    .nonempty('Insira o número de habilitação do condutor'),
  catergoriaHabilitacao: z
    .string()
    .nonempty('Insira a categória da habilitação do condutor'),
  vencimentoHabilitacao: z.coerce
    .date({
      required_error: 'Insira a data de vencimento da habilitação',
      invalid_type_error: 'Insira a data de vencimento da habilitação'
    })
    .min(new Date(), { message: 'A habilitação esta vencida!' })
});

export type TConductor = z.infer<typeof newConductorSchema>;
