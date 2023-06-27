'use client';
import DashboardCountBox from '@components/DashboardCountBox';
import LineChart from '@components/LineChart';
import PieChart from '@components/Table/PieChart';

import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Container } from '@mui/material';
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
    <Container maxWidth="xl" sx={{ marginTop: '16px' }}>
      <Grid
        container
        width="100%"
        // justifyContent="space-around"
        // gap="16px"
        spacing={4}
        sx={{ minWidth: '100%' }}
      >
        <Grid xs={2.5}>
          <DashboardCountBox
            count={clientsLength}
            label="Total de clientes"
            Icon={() => <PersonOutlineIcon fontSize="large" />}
          />
        </Grid>
        <Grid xs={2.5}>
          <DashboardCountBox
            count={conductorsLength}
            label="Total de condutores"
            Icon={() => <AirlineSeatReclineExtraIcon fontSize="large" />}
          />
        </Grid>
        <Grid xs={2.5}>
          <DashboardCountBox
            count={vehiclesLength}
            label="Total de veículos"
            Icon={() => <DirectionsCarIcon fontSize="large" />}
          />
        </Grid>
        <Grid xs={2.5}>
          <DashboardCountBox
            count={activeTravels.length}
            label="Deslocamentos ativos"
            Icon={() => <ModeOfTravelIcon fontSize="large" />}
          />
        </Grid>
      </Grid>
      <LineChart travels={travels} />
      <PieChart conductors={conductors} travels={activeTravels} />
    </Container>
  );
}
