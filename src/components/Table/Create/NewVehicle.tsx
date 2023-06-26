import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MRT_ColumnDef } from 'material-react-table';

import 'dayjs/locale/pt-br';
import { TVehicle, newVehicleSchema } from '../../../schemas/vehicleSchema';

interface CreateModalProps {
  columns: MRT_ColumnDef<TVehicle>[];
  onClose: () => void;
  onSubmit: (values: TVehicle) => void;
  open: boolean;
}

export const NewVehicle = ({
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
  } = useForm<TVehicle>({
    resolver: zodResolver(newVehicleSchema)
  });

  const onSubmitHandler: SubmitHandler<TVehicle> = async (data, e) => {
    e?.target.reset();
    onSubmit(data);
    reset();
    onClose();
  };
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Criar Novo Registro</DialogTitle>
      <DialogContent sx={{ paddingY: '20px' }}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem'
            }}
          >
            {columns.map(
              ({ accessorKey, header }) =>
                accessorKey && (
                  <TextField
                    key={accessorKey}
                    label={header}
                    error={!!errors[accessorKey]}
                    helperText={
                      errors[accessorKey] ? errors[accessorKey]?.message : ''
                    }
                    {...register(accessorKey)}
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
