import { Table } from '@components/Table';

import { Client } from '../../schemas/clientSchema';
import { TConductor } from '../../schemas/conductorSchema';
import { TTravel } from '../../schemas/travelSchema';
import { TVehicle } from '../../schemas/vehicleSchema';
import { clientRequests } from '../../services/client';
import { conductorRequest } from '../../services/conductor';
import { travelRequest } from '../../services/travel';
import { vehicleRequest } from '../../services/vehicle';

export const revalidate = 5;
export default async function page() {
  const travelsResponse: Promise<TTravel[]> = travelRequest.findAll();
  const conductorsResponse: Promise<TConductor[]> = conductorRequest.findAll();
  const clientsResponse: Promise<Client[]> = clientRequests.findAll();
  const vehiclesResponse: Promise<TVehicle[]> = vehicleRequest.findAll();
  const [travelsData, conductors, clients, vehicles] = await Promise.all([
    travelsResponse,
    conductorsResponse,
    clientsResponse,
    vehiclesResponse
  ]);
  const travels = travelsData.map((travel) => {
    const clientName = clients.find(({ id }) => id === travel.idCliente);
    const conductorName = conductors.find(({ id }) => id === travel.idCondutor);
    const vehicle = vehicles.find(({ id }) => id === travel.idVeiculo);
    if (clientName && conductorName && vehicle) {
      travel.idCliente = clientName.nome;
      travel.idCondutor = conductorName.nome;
      travel.idVeiculo = vehicle.placa;
    }
    return travel;
  });
  if (!travels) throw new Error('Nenhum cliente encontrado');
  return <Table.Travel data={travels} />;
}
