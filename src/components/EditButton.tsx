import React from 'react';

import { Edit } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export default function EditButton({
  handleClick
}: {
  handleClick: () => void;
}) {
  return (
    <Tooltip arrow placement="left" title="Editar">
      <IconButton onClick={handleClick}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
}
