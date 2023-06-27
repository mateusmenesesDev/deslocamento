'use client';
import DashboardCountBox from '@components/DashboardCountBox';
import LineChart from '@components/LineChart';
import PieChart from '@components/Table/PieChart';

import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { Client } from '../../schemas/clientSchema';
import { TConductor } from '../../schemas/conductorSchema';
import { TTravel } from '../../schemas/travelSchema';
import { TVehicle } from '../../schemas/vehicleSchema';

type Props = {
  clients: Client[];
  conductors: TConductor[];
  vehicles: TVehicle[];
  travels: TTravel[];
};
export default function Dashboard({
  clients,
  conductors,
  vehicles,
  travels
}: Props) {
  console.log(travels);

  const clientsLength = clients.length;
  const conductorsLength = conductors.length;
  const vehiclesLength = vehicles.length;
  const activeTravels = travels.filter((travel) => {
    if (travel.fimDeslocamento === null) {
      return travel;
    }
  });
  return (
    <>
      <Grid
        container
        width="100%"
        justifyContent="space-around"
        gap="16px"
        sx={{ minWidth: { xs: '100px', sm: '360px', md: '400px' } }}
      >
        <DashboardCountBox
          count={clientsLength}
          label="Total de clientes"
          Icon={() => <PersonOutlineIcon fontSize="large" />}
        />
        <DashboardCountBox
          count={conductorsLength}
          label="Total de condutores"
          Icon={() => <AirlineSeatReclineExtraIcon fontSize="large" />}
        />
        <DashboardCountBox
          count={vehiclesLength}
          label="Total de veículos"
          Icon={() => <DirectionsCarIcon fontSize="large" />}
        />
        <DashboardCountBox
          count={activeTravels.length}
          label="Deslocamentos ativos"
          Icon={() => <ModeOfTravelIcon fontSize="large" />}
        />
      </Grid>
      <LineChart />
      <PieChart conductors={conductors} travels={activeTravels} />
    </>
  );
}
