import Dashboard from '@components/Dashboard';

import { Client } from '../schemas/clientSchema';
import { TConductor } from '../schemas/conductorSchema';
import { TTravel } from '../schemas/travelSchema';
import { TVehicle } from '../schemas/vehicleSchema';
import { clientRequests } from '../services/client';
import { conductorRequest } from '../services/conductor';
import { travelRequest } from '../services/travel';
import { vehicleRequest } from '../services/vehicle';

export const revalidate = 5;
export default async function Home() {
  const clients: Client[] = await clientRequests.findAll();
  const conductors: TConductor[] = await conductorRequest.findAll();
  const vehicles: TVehicle[] = await vehicleRequest.findAll();
  const travels: TTravel[] = await travelRequest.findAll();
  return (
    <Dashboard
      clients={clients}
      conductors={conductors}
      vehicles={vehicles}
      travels={travels}
    />
  );
}
