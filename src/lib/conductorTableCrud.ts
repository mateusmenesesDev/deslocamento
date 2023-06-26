import { TConductor } from '../schemas/conductorSchema';
import { conductorRequest } from '../services/conductor';
import { DeleteRowProps, EditRowProps, NewRowProps } from '../typings/Crud';
import { revalidate } from './revalidatePaths';

export const createNewRow = async ({
  values,
  dataTable,
  setDataTable
}: NewRowProps<TConductor>) => {
  try {
    await conductorRequest.createNew(values);
    await revalidate.conductor();
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
}: DeleteRowProps<TConductor>) => {
  try {
    await conductorRequest.deleteById(Number(row.original.id));
    await revalidate.conductor();
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
}: EditRowProps<TConductor>) => {
  if (MUI) {
    await conductorRequest.updateById({
      ...MUI.values,
      id: MUI.row.original.id
    });
    dataTable[MUI.row.index] = MUI.values;
    revalidate.conductor();
    setDataTable([...dataTable]);
    MUI.exitEditingMode();
  }
};
