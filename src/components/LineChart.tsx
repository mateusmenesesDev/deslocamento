import Chart from 'react-apexcharts';

import Box from '@mui/material/Box';

import { TTravel } from '../schemas/travelSchema';

type Props = {
  travels: TTravel[];
};

type Month = {
  0: 'jan';
  1: 'fev';
  2: 'mar';
  3: 'abr';
  4: 'mai';
  5: 'jun';
  6: 'jul';
  7: 'ago';
  8: 'set';
  9: 'out';
  10: 'nov';
  11: 'dez';
};

type TravelsByMonth = {
  [key in Month[keyof Month]]: number;
};

export default function LineChart({ travels }: Props) {
  const months: Month = {
    0: 'jan',
    1: 'fev',
    2: 'mar',
    3: 'abr',
    4: 'mai',
    5: 'jun',
    6: 'jul',
    7: 'ago',
    8: 'set',
    9: 'out',
    10: 'nov',
    11: 'dez'
  };
  const travelsByMonth: TravelsByMonth = travels.reduce(
    (acc, curr) => {
      const date = new Date(curr.inicioDeslocamento);
      const month = date.getMonth();
      Object.entries(months).forEach(([key, value]) => {
        if (Number(key) === month) {
          acc[value] += 1;
        }
      });
      return acc;
    },
    {
      jan: 0,
      fev: 0,
      mar: 0,
      abr: 0,
      mai: 0,
      jun: 0,
      jul: 0,
      ago: 0,
      set: 0,
      out: 0,
      nov: 0,
      dez: 0
    }
  );
  const state = {
    options: {
      chart: {
        id: 'basic-line'
      },
      xaxis: {
        categories: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez'
        ]
      }
    },
    series: [
      {
        name: 'Deslocamentos',
        data: [
          travelsByMonth.jan,
          travelsByMonth.fev,
          travelsByMonth.mar,
          travelsByMonth.abr,
          travelsByMonth.mai,
          travelsByMonth.jun,
          travelsByMonth.jul,
          travelsByMonth.ago,
          travelsByMonth.set,
          travelsByMonth.out,
          travelsByMonth.nov,
          travelsByMonth.dez
        ]
      }
    ]
  };
  return (
    <Box className="app">
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width="800"
      />
    </Box>
  );
}
