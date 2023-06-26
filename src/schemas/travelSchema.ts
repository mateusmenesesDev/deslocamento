import { z } from 'zod';

export const newTravelSchema = z.object({
  id: z.number().optional(),
  idCondutor: z
    .string()
    .nonempty('Informe o condutor do deslocamento')
    .or(z.number()),
  idCliente: z
    .string()
    .nonempty('Informe o cliente do deslocamento')
    .or(z.number()),
  idVeiculo: z
    .string()
    .nonempty('Informe o veiculo do deslocamento')
    .or(z.number()),
  kmInicial: z.coerce
    .number({ invalid_type_error: 'O valor deve ser um número!' })
    .refine((value) => value > 0, {
      message: 'O valor deve ser no mínimo 0'
    }),
  kmFinal: z.coerce
    .number({ invalid_type_error: 'O valor deve ser um número!' })
    .nonnegative('O km não pode ser negativo!')
    .optional(),
  inicioDeslocamento: z.coerce.date({
    required_error: 'Insira a data de início do deslocamento!',
    invalid_type_error: 'Insira a data de início do deslocamento!'
  }),
  fimDeslocamento: z.date().optional(),
  checkList: z.string().optional(),
  motivo: z.string().optional(),
  observacao: z.string().optional()
});

export type TTravel = z.infer<typeof newTravelSchema>;
