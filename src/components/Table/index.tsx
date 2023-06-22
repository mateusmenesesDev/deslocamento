'use client';

import { useState } from 'react';

import DeleteButton from '@components/DeleteButton';
import EditButton from '@components/EditButton';
import { NewDataModal } from '@components/Table/NewData';

import {
  createNewRow,
  handleDeleteRow,
  handleSaveRowEdit
} from '@lib/tableCrud';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import { Client } from '../../schemas/clientSchema';

type Props = {
  data: Client[];
  columns: MRT_ColumnDef<Client>[];
};

export default function Table({ data, columns }: Props) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ordededData = data.reverse();
  const [dataTable, setDataTable] = useState(ordededData);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5">
        Total de clientes: {dataTable.length}
      </Typography>
      <Box>
        <Button
          color="secondary"
          onClick={() => setCreateModalOpen(true)}
          variant="contained"
        >
          CRIAR NOVO REGISTRO
        </Button>
      </Box>
      <MaterialReactTable
        localization={MRT_Localization_PT_BR}
        state={{ showProgressBars: isLoading, isLoading }}
        columns={columns}
        data={dataTable ?? []}
        enableColumnOrdering
        enableEditing
        onEditingRowSave={async (MUI) => {
          setIsLoading(true);
          await handleSaveRowEdit({ MUI, dataTable, setDataTable });
          setIsLoading(false);
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Ações'
          }
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
          </Box>
        )}
        enableTopToolbar
      />
      <NewDataModal
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
