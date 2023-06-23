import { Controller, SubmitHandler, useForm } from 'react-hook-form';

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
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MRT_ColumnDef } from 'material-react-table';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

import { newConductorSchema } from '../../../schemas/conductorSchema';
import { TConductor } from '../../../schemas/conductorSchema';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface CreateModalProps {
  columns: MRT_ColumnDef<TConductor>[];
  onClose: () => void;
  onSubmit: (values: TConductor) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
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
    console.log(typeof data.vencimentoHabilitacao);
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
            {/* <input
              // defaultValue="12/12/1990"
              type="date"
              {...register('vencimentoHabilitacao')}
            /> */}
            <Controller
              name="vencimentoHabilitacao"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker {...field} />
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
