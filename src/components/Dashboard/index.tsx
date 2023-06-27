'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MenuIcon from '@mui/icons-material/Menu';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { Client } from '../../schemas/clientSchema';
import { TConductor } from '../../schemas/conductorSchema';
import { TTravel } from '../../schemas/travelSchema';
import { TVehicle } from '../../schemas/vehicleSchema';
import DashboardCountBox from '@components/DashboardCountBox';

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
  }).length;
  return (
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
        Icon={() => <PersonOutlineIcon fontSize="large" />}
      />
      <DashboardCountBox
        count={vehiclesLength}
        label="Total de veículos"
        Icon={() => <PersonOutlineIcon fontSize="large" />}
      />
      <DashboardCountBox
        count={activeTravels}
        label="Deslocamentos ativos"
        Icon={() => <PersonOutlineIcon fontSize="large" />}
      />
    </Grid>
  );
}
