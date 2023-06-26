import { Table } from '@components/Table';

import { TVehicle } from '../../schemas/vehicleSchema';
import { vehicleRequest } from '../../services/vehicle';

export const revalidate = 5;
export default async function page() {
  const vehicle: TVehicle[] = await vehicleRequest.findAll();
  if (!vehicle) throw new Error('Nenhum cliente encontrado');
  return <Table.Vehicle data={vehicle} />;
}
