import { TTravel } from '../schemas/travelSchema';
import { travelRequest } from '../services/travel';
import { DeleteRowProps, EditRowProps, NewRowProps } from '../typings/Crud';
import { revalidate } from './revalidatePaths';

export const createNewRow = async ({
  values,
  dataTable,
  setDataTable
}: NewRowProps<TTravel>) => {
  try {
    await travelRequest.createNew(values);
    await revalidate.travel();
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
    setDataTable([...dataTable]);
    MUI.exitEditingMode();
  }
};
