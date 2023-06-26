import { z } from 'zod';

export const newVehicleSchema = z.object({
  id: z.number().optional(),
  placa: z.string().nonempty('Insira o número da placa do veículo'),
  marcaModelo: z.string().nonempty('Insira o modelo do veículo'),
  anoFabricacao: z.coerce
    .number()
    .refine((value) => String(value).length === 4, {
      message: 'O ano deve ser escrito no seguinte formato: 2014'
    }),
  kmAtual: z.coerce
    .number({ invalid_type_error: 'O valor deve ser um número!' })
    .refine((value) => value > 0, {
      message: 'O valor deve ser no mínimo 0'
    })
});

export type TVehicle = z.infer<typeof newVehicleSchema>;
