import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  count: number;
  label: string;
  Icon: () => ReactNode;
};
export default function DashboardCountBox({ count, label, Icon }: Props) {
  return (
    <Box
      bgcolor="white"
      textAlign="center"
      display="flex"
      alignItems="center"
      alignContent="center"
      gap="1.5rem"
      p="1rem"
      borderRadius="25px"
      width="100%"
      height="100%"
      minHeight="100%"
      justifyContent="center"
    >
      <div>{Icon()}</div>
      <div>
        <Typography display="block" variant="caption" fontSize="14px">
          {label}
        </Typography>
        <Typography
          display="block"
          variant="body1"
          fontSize="32px"
          fontWeight="500"
        >
          {count}
        </Typography>
      </div>
    </Box>
  );
}
