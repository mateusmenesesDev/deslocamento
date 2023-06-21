import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
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

import { Client, newClientSchema } from '../../schemas/clientSchema';

interface CreateModalProps {
  columns: MRT_ColumnDef<Client>[];
  onClose: () => void;
  onSubmit: (values: Client) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const NewDataModal = ({
  open,
  columns,
  onClose,
  onSubmit
}: CreateModalProps) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<Client>({
    resolver: zodResolver(newClientSchema)
  });

  const onSubmitHandler: SubmitHandler<Client> = async (data) => {
    console.log(data);
    console.log('cheguei no submit');
    onSubmit(data);
    reset();
    onClose();
  };
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Criar Novo Registro</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem'
            }}
          >
            {columns.map(
              (column) =>
                column.accessorKey && (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    error={!!errors[column.accessorKey]}
                    helperText={
                      errors[column.accessorKey]
                        ? errors[column.accessorKey]?.message
                        : ''
                    }
                    {...register(column.accessorKey)}
                  />
                )
            )}
          </Stack>
          <DialogActions sx={{ p: '1.25rem', justifyContent: 'space-between' }}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit" color="secondary" variant="contained">
              Confirmar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
