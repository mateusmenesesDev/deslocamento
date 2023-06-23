import { Client } from '../schemas/clientSchema';
import { clientRequests } from '../services/client';
import { DeleteRowProps, EditRowProps, NewRowProps } from '../typings/Crud';
import { revalidate } from './revalidatePaths';

export const createNewRow = async ({
  values,
  dataTable,
  setDataTable
}: NewRowProps<Client>) => {
  try {
    await clientRequests.createNew(values);
    await revalidate.clients();
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
}: DeleteRowProps<Client>) => {
  try {
    await clientRequests.deleteById(Number(row.original.id));
    await revalidate.clients();
    dataTable.splice(row.index, 1);
    setDataTable([...dataTable]);
    console.log(dataTable.length);
  } catch (err) {
    console.log(err);
  }
};

export const handleSaveRowEdit = async ({
  MUI,
  dataTable,
  setDataTable
}: EditRowProps<Client>) => {
  if (MUI) {
    await clientRequests.updateById({ ...MUI.values, id: MUI.row.original.id });
    dataTable[MUI.row.index] = MUI.values;
    await revalidate.clients();
    setDataTable([...dataTable]);
    MUI.exitEditingMode();
  }
};
