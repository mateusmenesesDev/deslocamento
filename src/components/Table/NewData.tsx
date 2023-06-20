import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import { IClient } from '../../typings/clients';

interface CreateModalProps {
  columns: MRT_ColumnDef<IClient>[];
  onClose: () => void;
  onSubmit: (values: IClient) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const NewDataModal = ({
  open,
  columns,
  onClose,
  onSubmit
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any)
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Criar Novo Registro</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem'
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
