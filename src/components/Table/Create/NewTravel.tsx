import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MRT_ColumnDef } from 'material-react-table';

import 'dayjs/locale/pt-br';
import { TTravel, newTravelSchema } from '../../../schemas/travelSchema';

interface CreateModalProps {
  columns: MRT_ColumnDef<TTravel>[];
  onClose: () => void;
  onSubmit: (values: TTravel) => void;
  open: boolean;
}

export const NewTravel = ({
  open,
  columns,
  onClose,
  onSubmit
}: CreateModalProps) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<TTravel>({
    resolver: zodResolver(newTravelSchema)
  });

  const onSubmitHandler: SubmitHandler<TTravel> = async (data, e) => {
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
                accessorKey !== 'inicioDeslocamento' &&
                accessorKey !== 'fimDeslocamento' && (
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
              name="inicioDeslocamento"
              control={control}
              render={({ field }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker {...field} label={'Inicio do Deslocamento'} />
                </LocalizationProvider>
              )}
            ></Controller>
            <Controller
              name="fimDeslocamento"
              control={control}
              render={({ field }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker {...field} label={'Fim do Deslocamento'} />
                </LocalizationProvider>
              )}
            ></Controller>
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
