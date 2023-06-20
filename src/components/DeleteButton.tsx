import React from 'react';

import { Delete } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export default function DeleteButton({
  handleClick
}: {
  handleClick: () => void;
}) {
  return (
    <Tooltip arrow placement="left" title="Remover">
      <IconButton color="error" onClick={handleClick}>
        <Delete />
      </IconButton>
    </Tooltip>
  );
}
