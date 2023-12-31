import { TVehicle } from '../schemas/vehicleSchema';
import { vehicleRequest } from '../services/vehicle';
import { DeleteRowProps, EditRowProps, NewRowProps } from '../typings/Crud';
import { revalidate } from './revalidatePaths';

export const createNewRow = async ({
  values,
  dataTable,
  setDataTable
}: NewRowProps<TVehicle>) => {
  try {
    await vehicleRequest.createNew(values);
    await revalidate.vehicles();
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
}: DeleteRowProps<TVehicle>) => {
  try {
    await vehicleRequest.deleteById(Number(row.original.id));
    await revalidate.vehicles();
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
}: EditRowProps<TVehicle>) => {
  if (MUI) {
    await vehicleRequest.updateById({
      ...MUI.values,
      id: MUI.row.original.id
    });
    dataTable[MUI.row.index] = MUI.values;
    revalidate.vehicles();
    await revalidate.dashboard();
    setDataTable([...dataTable]);
    MUI.exitEditingMode();
  }
};
