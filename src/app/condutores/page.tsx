import { Table } from '@components/Table';

import { TConductor } from '../../schemas/conductorSchema';
import { TTravel } from '../../schemas/travelSchema';
import { conductorRequest } from '../../services/conductor';
import { travelRequest } from '../../services/travel';

export const revalidate = 5;
export default async function page() {
  const conductorResponse: Promise<TConductor[]> = conductorRequest.findAll();
  const travelsResponse: Promise<TTravel[]> = travelRequest.findAll();
  const [conductors, travels] = await Promise.all([
    conductorResponse,
    travelsResponse
  ]);
  const activeTravels = travels.filter((travel) => !travel.fimDeslocamento);
  const conductorsOnTravel = activeTravels.map(({ idCondutor }) => idCondutor);
  if (!conductors) throw new Error('Nenhum cliente encontrado');
  return (
    <Table.Conductor
      data={conductors}
      conductorsOnTravel={conductorsOnTravel}
    />
  );
}
