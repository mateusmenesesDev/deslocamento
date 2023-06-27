'use client';

import { useState } from 'react';

import DeleteButton from '@components/DeleteButton';
import EditButton from '@components/EditButton';

import {
  createNewRow,
  handleDeleteRow,
  handleSaveRowEdit
} from '@lib/conductorTableCrud';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MaterialReactTable } from 'material-react-table';

import { conductorColumns } from '../../constants/columnsTable';
import { TConductor } from '../../schemas/conductorSchema';
import { tableConfig } from './config';
import { NewConductor } from './Create/NewConductor';

type Props = {
  data: TConductor[];
  conductorsOnTravel: (string | number)[];
};

export default function Conductor({ data, conductorsOnTravel }: Props) {
  const columns = conductorColumns;
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ordededData = data.reverse();
  const [dataTable, setDataTable] = useState(ordededData);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5">
        Total de condutores: {dataTable.length}
      </Typography>
      <Box sx={{ marginY: '10px' }}>
        <Button
          color="secondary"
          onClick={() => setCreateModalOpen(true)}
          variant="contained"
        >
          ADICIONAR NOVO CONDUTOR
        </Button>
      </Box>
      <MaterialReactTable
        {...tableConfig}
        state={{ showProgressBars: isLoading, isLoading }}
        columns={columns}
        data={dataTable ?? []}
        onEditingRowSave={async (MUI) => {
          if (!MUI.values.vencimentoHabilitacao) {
            return alert('Informe a data de vencimento da carteira');
          }
          const previousDate = new Date(
            MUI.row.getValue('vencimentoHabilitacao')
          );
          const today = new Date();
          if (MUI.values.vencimentoHabilitacao < today) {
            return alert('A carteira está vencida!');
          }
          if (MUI.values.vencimentoHabilitacao < previousDate) {
            return alert(
              'A nova data de vencimento não pode ser menor do que a anterior!'
            );
          }
          setIsLoading(true);
          await handleSaveRowEdit({ MUI, dataTable, setDataTable });
          setIsLoading(false);
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <EditButton handleClick={() => table.setEditingRow(row)} />
            <DeleteButton
              handleDelete={async () => {
                setIsLoading(true);
                await handleDeleteRow({ row, dataTable, setDataTable });
                setIsLoading(false);
              }}
            />
            {/* {!conductorsOnTravel.includes(row.getValue('id')) && (
              <Button>Iniciar deslocamento</Button>
            )} */}
          </Box>
        )}
      />
      <NewConductor
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={async (values) => {
          setIsLoading(true);
          await createNewRow({ values, dataTable, setDataTable });
          setIsLoading(false);
        }}
      />
    </Box>
  );
}
