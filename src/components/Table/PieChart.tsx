'use client';
// import ReactApexChart from 'react-apexcharts';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
import { TConductor } from '../../schemas/conductorSchema';
import { TTravel } from '../../schemas/travelSchema';

type Props = {
  conductors: TConductor[];
  travels: TTravel[];
};
export default function PieChart({ conductors, travels }: Props) {
  const conductorsInTravels = travels.map((travel) => travel.idCondutor);
  const conductorsOnHold = conductors.filter(({ id }) => {
    if (id) return !conductorsInTravels.includes(id);
  });
  const state = {
    series: [conductorsOnHold.length, conductorsInTravels.length],
    options: {
      labels: ['Em espera', 'Em deslocamento'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  };
  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="pie"
      width="100%"
    />
  );
}
