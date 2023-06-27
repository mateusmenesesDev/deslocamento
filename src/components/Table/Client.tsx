'use client';

import { useState } from 'react';

import DeleteButton from '@components/DeleteButton';
import EditButton from '@components/EditButton';

import {
  createNewRow,
  handleDeleteRow,
  handleSaveRowEdit
} from '@lib/clientTableCrud';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MaterialReactTable } from 'material-react-table';

import { clientColumns } from '../../constants/columnsTable';
import { Client } from '../../schemas/clientSchema';
import { tableConfig } from './config';
import { NewClient } from './Create/NewClient';

type Props = {
  data: Client[];
};

export default function Client({ data }: Props) {
  const columns = clientColumns;
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ordededData = data.reverse();
  const [dataTable, setDataTable] = useState(ordededData);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5">
        Total de clientes: {dataTable.length}
      </Typography>
      <Box sx={{ marginY: '10px' }}>
        <Button
          color="secondary"
          onClick={() => setCreateModalOpen(true)}
          variant="contained"
        >
          ADICIONAR NOVO CLIENTE
        </Button>
      </Box>
      <MaterialReactTable
        {...tableConfig}
        state={{ showProgressBars: isLoading, isLoading }}
        columns={columns}
        data={dataTable ?? []}
        onEditingRowSave={async (MUI) => {
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
          </Box>
        )}
      />
      <NewClient
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
