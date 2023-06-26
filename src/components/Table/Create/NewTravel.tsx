import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
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

import 'dayjs/locale/pt-br';
import { Client } from '../../../schemas/clientSchema';
import { TConductor } from '../../../schemas/conductorSchema';
import { TTravel, newTravelSchema } from '../../../schemas/travelSchema';
import { TVehicle } from '../../../schemas/vehicleSchema';
import { clientRequests } from '../../../services/client';
import { conductorRequest } from '../../../services/conductor';
import { vehicleRequest } from '../../../services/vehicle';

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
    const client = clients.find(({ nome }) => nome === data.idCliente);
    const conductor = conductors.find(({ nome }) => nome === data.idCondutor);
    const vehicle = vehicles.find(({ placa }) => placa === data.idVeiculo);
    if (client?.id && conductor?.id && vehicle?.id) {
      data.idCliente = client.id;
      data.idCondutor = conductor.id;
      data.idVeiculo = vehicle.id;
    }
    onSubmit(data);
    reset();
    onClose();
  };
  const [clients, setClients] = useState<Client[]>([]);
  const [conductors, setConductors] = useState<TConductor[]>([]);
  const [vehicles, setVehicles] = useState<TVehicle[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const requestClients: Promise<Client[]> = clientRequests.findAll();
      const requestConductors: Promise<TConductor[]> =
        conductorRequest.findAll();
      const requestVehicles: Promise<TVehicle[]> = vehicleRequest.findAll();
      const [clients, conductors, vehicles] = await Promise.all([
        requestClients,
        requestConductors,
        requestVehicles
      ]);
      setClients(clients);
      setConductors(conductors);
      setVehicles(vehicles);
    };
    getClients();
  }, []);

  const selectColumns = ['idCondutor', 'idCliente', 'idVeiculo'];
  const dateColumns = ['inicioDeslocamento', 'fimDeslocamento'];
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
                !selectColumns.includes(accessorKey) &&
                !dateColumns.includes(accessorKey) && (
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
            <Autocomplete
              disablePortal
              id="idCliente"
              options={clients.map(({ nome }) => nome)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cliente"
                  {...register('idCliente')}
                  error={!!errors.idCliente}
                  helperText={errors.idCliente ? errors.idCliente?.message : ''}
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="idCondutor"
              options={conductors.map(({ nome }) => nome)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Condutor"
                  {...register('idCondutor')}
                  error={!!errors.idCliente}
                  helperText={errors.idCliente ? errors.idCliente?.message : ''}
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="idVeiculo"
              options={vehicles.map(({ placa }) => placa)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Placa do Veículo"
                  {...register('idVeiculo')}
                  error={!!errors.idCliente}
                  helperText={errors.idCliente ? errors.idCliente?.message : ''}
                />
              )}
            />
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
            <Typography color="red">
              {errors.inicioDeslocamento?.message}
            </Typography>

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
