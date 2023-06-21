'use client';

import { useMemo, useState } from 'react';

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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type MRT_ColumnDef, MaterialReactTable } from 'material-react-table';

import useClient from '../../hooks/useClient';
import { IClient } from '../../typings/clients';

type Props = {
  data: IClient[];
};

export default function Table() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef<IClient>[]>(
    () => [
      {
        accessorKey: 'nome',
        header: 'Nome'
      },
      {
        accessorKey: 'tipoDocumento',
        header: 'Tipo do documento'
      },
      {
        accessorKey: 'numeroDocumento',
        header: 'Documento'
      },
      {
        accessorKey: 'bairro',
        header: 'Bairro'
      },
      {
        accessorKey: 'cidade',
        header: 'Cidade'
      },
      {
        accessorKey: 'logradouro',
        header: 'Logradouro'
      },

      {
        accessorKey: 'numero',
        header: 'Numero'
      },
      {
        accessorKey: 'uf',
        header: 'UF'
      }
    ],
    []
  );
  const { data } = useClient();
  const [dataTable, setDataTable] = useState(data);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography>Total de clientes: {data.length}</Typography>
      <MaterialReactTable
        columns={columns}
        data={dataTable}
        enableColumnOrdering
        enableEditing
        onEditingRowSave={(MUI) =>
          handleSaveRowEdit({ MUI, dataTable, setDataTable })
        }
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Ações'
          }
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <EditButton handleClick={() => table.setEditingRow(row)} />
            <DeleteButton
              handleClick={() =>
                handleDeleteRow({ row, dataTable, setDataTable })
              }
            />
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            CRIAR NOVO REGISTRO
          </Button>
        )}
      />
      <NewDataModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={(values) => createNewRow({ values, dataTable, setDataTable })}
      />
    </Box>
  );
}
