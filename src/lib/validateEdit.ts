import { TVehicle } from '../schemas/vehicleSchema';

export const validateEditVehicle = (values: TVehicle) => {
  if (!values.marcaModelo) return alert('A marca do veículo é obrigatória!');
  if (!values.anoFabricacao) return alert('O ano de fabricação é obrigatório!');
  if (!values.kmAtual) return alert('A KM atual é obrigatória!');
};
