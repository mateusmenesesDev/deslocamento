import { Client } from '../schemas/clientSchema';
import { TConductor } from '../schemas/conductorSchema';
import { TTravel } from '../schemas/travelSchema';
import { TVehicle } from '../schemas/vehicleSchema';
import { clientRequests } from '../services/client';
import { conductorRequest } from '../services/conductor';
import { travelRequest } from '../services/travel';
import { vehicleRequest } from '../services/vehicle';
import { DeleteRowProps, EditRowProps, NewRowProps } from '../typings/Crud';
import { revalidate } from './revalidatePaths';

export const createNewRow = async ({
  values,
  dataTable,
  setDataTable
}: NewRowProps<TTravel>) => {
  try {
    const conductorResponse: Promise<TConductor> = conductorRequest.findById(
      values.idCondutor as number
    );
    const clientResponse: Promise<Client> = clientRequests.findById(
      values.idCliente as number
    );
    const vehicleResponse: Promise<TVehicle> = vehicleRequest.findById(
      values.idVeiculo as number
    );
    const [conductor, client, vehicle] = await Promise.all([
      conductorResponse,
      clientResponse,
      vehicleResponse,
      travelRequest.createNew(values)
    ]);
    values.idCondutor = conductor.nome;
    values.idCliente = client.nome;
    values.idVeiculo = vehicle.placa;
    await revalidate.travel();
    await revalidate.dashboard();
    dataTable.unshift(values);
    setDataTable([...dataTable]);
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteRow = async ({
  row,
  dataTable,
  setDataTable
}: DeleteRowProps<TTravel>) => {
  try {
    await travelRequest.deleteById(Number(row.original.id));
    await revalidate.travel();
    await revalidate.dashboard();
    const newDataTable = dataTable.filter(({ id }) => id !== row.original.id);
    setDataTable(newDataTable);
  } catch (err) {
    console.log(err);
  }
};

export const handleSaveRowEdit = async ({
  MUI,
  dataTable,
  setDataTable
}: EditRowProps<TTravel>) => {
  if (MUI) {
    await travelRequest.updateById({
      ...MUI.values,
      id: MUI.row.original.id
    });
    dataTable[MUI.row.index] = MUI.values;
    revalidate.travel();
    revalidate.dashboard();
    setDataTable([...dataTable]);
    MUI.exitEditingMode();
  }
};
