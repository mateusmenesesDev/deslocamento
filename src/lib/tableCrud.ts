import { clientRequests } from '../services/client';
import {
  DeleteRowProps,
  EditRowProps,
  NewRowProps
} from '../typings/tableCrud';

export const createNewRow = async ({
  values,
  dataTable,
  setDataTable
}: NewRowProps) => {
  try {
    await clientRequests.createNew(values);
    fetch(
      `${
        process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
      }/api/revalidate`
    );
    dataTable.push(values);
    setDataTable([...dataTable]);
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteRow = async ({
  row,
  dataTable,
  setDataTable
}: DeleteRowProps) => {
  if (
    !confirm(
      `Tem certeza que deseja deletar o cliente: ${row.getValue('nome')}`
    )
  ) {
    return;
  }
  //send api delete request here, then refetch or update local table data for re-render
  await clientRequests.deleteById(Number(row.original.id));
  fetch(
    `${
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
    }/api/revalidate`
  );

  dataTable.splice(row.index, 1);
  setDataTable([...dataTable]);
};

export const handleSaveRowEdit = async ({
  MUI,
  dataTable,
  setDataTable
}: EditRowProps) => {
  if (MUI) {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    await clientRequests.updateById({ ...MUI.values, id: MUI.row.original.id });
    dataTable[MUI.row.index] = MUI.values;
    fetch(
      `${
        process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
      }/api/revalidate`
    );
    setDataTable([...dataTable]);
    MUI.exitEditingMode();
  }
};
