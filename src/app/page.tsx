import Dashboard from '@components/Dashboard';

import { Client } from '../schemas/clientSchema';
import { TConductor } from '../schemas/conductorSchema';
import { TTravel } from '../schemas/travelSchema';
import { TVehicle } from '../schemas/vehicleSchema';
import { clientRequests } from '../services/client';
import { conductorRequest } from '../services/conductor';
import { travelRequest } from '../services/travel';
import { vehicleRequest } from '../services/vehicle';
import Weather from '@components/Weather';
import { weatherRequests } from '../services/weather';

export const revalidate = 5;
export default async function Home() {
  const clientsResponse: Promise<Client[]> = clientRequests.findAll();
  const conductorsResponse: Promise<TConductor[]> = conductorRequest.findAll();
  const vehiclesResponse: Promise<TVehicle[]> = vehicleRequest.findAll();
  const travelsResponse: Promise<TTravel[]> = travelRequest.findAll();
  const weathersDataResponse = weatherRequests.getAll();
  const [clients, conductors, vehicles, travels, weathers] = await Promise.all([
    clientsResponse,
    conductorsResponse,
    vehiclesResponse,
    travelsResponse,
    weathersDataResponse
  ]);
  return (
    <>
      <div>
        <Dashboard
          clients={clients}
          conductors={conductors}
          vehicles={vehicles}
          travels={travels}
        />
      </div>
      <div>
        <Weather weathersData={weathers} />
      </div>
    </>
  );
}
