'use client';
import AirIcon from '@mui/icons-material/Air';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Box, Typography } from '@mui/material';

type Props = {
  weathersData: Weather[];
};

type Weather = {
  summary:
    | 'Balmy'
    | 'Freezing'
    | 'Hot'
    | 'Bracing'
    | 'Sweltering'
    | 'Chilly'
    | 'Mild'
    | 'Cool';
  temperatureF: number;
  temperatureC: number;
  date: string;
};

export default async function Weather({ weathersData }: Props) {
  return (
    <Box marginTop="32px">
      <Typography fontSize="28px" textAlign="center" fontWeight="600">
        Previsão do Tempo
      </Typography>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '12px',
          width: '100%',
          gap: '12px',
          textAlign: 'center'
        }}
      >
        {weathersData.map(({ summary, temperatureC, date }, i) => (
          <div
            key={i}
            style={{
              width: '200px',
              height: '200px'
            }}
          >
            {temperatureC < 20 && <SevereColdIcon />}
            {temperatureC >= 20 && temperatureC <= 35 && <AirIcon />}
            {temperatureC > 35 && <WbSunnyIcon />}
            <Typography fontWeight="500" fontSize="18px">
              {new Date(date).toLocaleDateString('pt-br')}
            </Typography>
            <Typography>{summary}</Typography>
            <Typography>{`${temperatureC} ºC`}</Typography>
          </div>
        ))}
      </div>
    </Box>
  );
}
