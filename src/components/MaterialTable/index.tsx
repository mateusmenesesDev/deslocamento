'use client';

import { useCallback, useMemo, useState } from 'react';

import { NewDataModal } from '@components/Table/NewData';

import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
  MaterialReactTableProps
} from 'material-react-table';

import { clientRequests } from '../../services/client';
import { IClient } from '../../typings/clients';

type Props = {
  data: IClient[];
};

export default function Table({ data }: Props) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef<IClient>[]>(
    () => [
      // {
      //   accessorKey: 'id',
      //   header: 'ID'
      // },
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
  const [dataTable, setDataTable] = useState(data);

  const handleCreateNewRow = async (values: IClient) => {
    try {
      await clientRequests.createNew(values);
      fetch('/api/revalidate');
      dataTable.push(values);
      setDataTable([...dataTable]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveRowEdit: MaterialReactTableProps<IClient>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      await clientRequests.updateById({ ...values, id: row.original.id });
      dataTable[row.index] = values;
      fetch('/api/revalidate');
      setDataTable([...dataTable]);
      exitEditingMode();
    };
  const handleDeleteRow = useCallback(
    async (row: MRT_Row<IClient>) => {
      if (
        !confirm(
          `Tem certeza que deseja deletar o cliente: ${row.getValue('nome')}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      await clientRequests.deleteById(Number(row.original.id));
      fetch('/api/revalidate');

      dataTable.splice(row.index, 1);
      setDataTable([...dataTable]);
    },
    [dataTable]
  );
  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable
        columns={columns}
        data={dataTable}
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdit}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
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
        onSubmit={handleCreateNewRow}
      />
    </Box>
  );
}
