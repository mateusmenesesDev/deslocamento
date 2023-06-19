'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Check, Save } from '@mui/icons-material';
import { Box, CircularProgress, Fab } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

import { clientRequests } from '../../services/client';

type Props = {
  params: GridRenderCellParams;
  rowId: number | string;
  setRowId: Dispatch<SetStateAction<string | number>>;
};

export default function TableActions({ params, rowId, setRowId }: Props) {
  console.log(params.row);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const onSave = async () => {
    setLoading(true);
    const { nome, logradouro, numero, bairro, cidade, uf, id } = params.row;
    await clientRequests.updateById(params.id, {
      id,
      nome,
      logradouro,
      numero,
      bairro,
      cidade,
      uf
    });
    setLoading(false);
    setSuccess(true);
    setRowId(0);
  };
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {success ? (
        <Fab
          color="secondary"
          sx={{
            width: 40,
            height: 40
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="secondary"
          sx={{
            width: 40,
            height: 40
          }}
          disabled={params.id !== rowId || loading}
        >
          <Save onClick={onSave} />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          sx={{ position: 'relative', top: -6, left: -6, zIndex: 1 }}
        />
      )}
    </Box>
  );
}
