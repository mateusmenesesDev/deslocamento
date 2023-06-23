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
    console.log('Passei do request');
    // await revalidate.conductor();
    console.log('passei da revalidação');
    dataTable.unshift(values);
    console.log('Adicionei a nova data');
    setDataTable([...dataTable]);
    console.log('Atualizei o state');
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
}: EditRowProps<TConductor>) => {
  if (MUI) {
    await conductorRequest.updateById({
      ...MUI.values,
      id: MUI.row.original.id
    });
    console.log(MUI.values.vencimentoHabilitacao.toLocaleDateString('pt-br'));
    dataTable[MUI.row.index] = MUI.values;
    revalidate.conductor();
    setDataTable([...dataTable]);
    MUI.exitEditingMode();
  }
};
