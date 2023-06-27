import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MRT_ColumnDef } from 'material-react-table';

import { newConductorSchema } from '../../../schemas/conductorSchema';
import { TConductor } from '../../../schemas/conductorSchema';
import 'dayjs/locale/pt-br';

interface CreateModalProps {
  columns: MRT_ColumnDef<TConductor>[];
  onClose: () => void;
  onSubmit: (values: TConductor) => void;
  open: boolean;
}

export const NewConductor = ({
  open,
  columns,
  onClose,
  onSubmit
}: CreateModalProps) => {
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit
  } = useForm<TConductor>({
    resolver: zodResolver(newConductorSchema)
  });

  const onSubmitHandler: SubmitHandler<TConductor> = async (data, e) => {
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
                accessorKey &&
                accessorKey !== 'vencimentoHabilitacao' && (
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
            <Controller
              name="vencimentoHabilitacao"
              control={control}
              render={({ field }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker {...field} label="Vencimento Habilitação" />
                </LocalizationProvider>
              )}
            ></Controller>
            <Typography color="red" variant="caption">
              {errors?.vencimentoHabilitacao?.message}
            </Typography>
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
