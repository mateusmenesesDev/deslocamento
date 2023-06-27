import React from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IconButton, Tooltip } from '@mui/material';

export default function FinishButton({
  handleClick
}: {
  handleClick: () => void;
}) {
  return (
    <Tooltip arrow placement="left" title="Concluir">
      <IconButton onClick={handleClick}>
        <CheckCircleOutlineIcon color="success" />
      </IconButton>
    </Tooltip>
  );
}
