import { z } from 'zod';

export const newTravelSchema = z.object({
  id: z.number().optional(),
  condutor: z.string().nonempty('Informe o condutor do deslocamento'),
  cliente: z.string().nonempty('Informe o cliente do deslocamento'),
  veiculo: z.string().nonempty('Informe o veiculo do deslocamento'),
  kmInicial: z.coerce
    .number({ invalid_type_error: 'O valor deve ser um número!' })
    .refine((value) => value > 0, {
      message: 'O valor deve ser no mínimo 0'
    }),
  kmFinal: z.coerce
    .number({ invalid_type_error: 'O valor deve ser um número!' })
    .nonnegative('O km não pode ser negativo!')
    .optional(),
  inicioDeslocamento: z.date(),
  fimDeslocamento: z.date().optional(),
  checkList: z.string().optional(),
  motivo: z.string().optional(),
  observacao: z.string().optional()
});

export type TTravel = z.infer<typeof newTravelSchema>;
