import { Table } from '@components/Table';

import { TTravel } from '../../schemas/travelSchema';
import { travelRequest } from '../../services/travel';

export const revalidate = 5;
export default async function page() {
  const vehicle: TTravel[] = await travelRequest.findAll();
  if (!vehicle) throw new Error('Nenhum cliente encontrado');
  return <Table.Travel data={vehicle} />;
}
