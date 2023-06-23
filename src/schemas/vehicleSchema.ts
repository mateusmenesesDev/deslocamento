import { z } from 'zod';

export const newVehicleSchema = z.object({
  id: z.number().optional(),
  placa: z.string().nonempty('Insira o número da placa do veículo'),
  marcaModelo: z.string().nonempty('Insira o modelo do veículo'),
  anoFabricacao: z.string().nonempty('Insira o ano de fabricação do veículo'),
  kmAtual: z.string().nonempty('Informe a km atual do veículo')
});

export type TVehicleSchema = z.infer<typeof newVehicleSchema>;
