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
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import { Client } from '../../schemas/clientSchema';

type Props = {
  data: Client[];
};

export default function Table({ data }: Props) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const columns = useMemo<MRT_ColumnDef<Client>[]>(
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
  const ordededData = data.reverse();
  const [dataTable, setDataTable] = useState(ordededData);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography>Total de clientes: {dataTable.length}</Typography>
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
            header: 'Ações' //change header text
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
        // renderToolbarInternalActions={({ table }) => (
        //   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //     <Box>
        //       <Button
        //         color="secondary"
        //         onClick={() => setCreateModalOpen(true)}
        //         variant="contained"
        //       >
        //         CRIAR NOVO REGISTRO
        //       </Button>
        //     </Box>
        //     <Box>
        //       {/* add custom button to print table  */}
        //       {/* along-side built-in buttons in whatever order you want them */}
        //       <MRT_ToggleGlobalFilterButton table={table} />
        //       <MRT_ToggleFiltersButton table={table} />
        //       <MRT_ShowHideColumnsButton table={table} />
        //       {/* <MRT_GlobalFilterTextField table={table} /> */}
        //       <MRT_ToggleDensePaddingButton table={table} />
        //       <MRT_FullScreenToggleButton table={table} />
        //     </Box>
        //   </Box>
        // )}
        // enableGlobalFilterModes
        // initialState={{
        //   showGlobalFilter: true
        // }}
        // renderTopToolbarCustomActions={() => (
        //   <Button
        //     color="secondary"
        //     onClick={() => setCreateModalOpen(true)}
        //     variant="contained"
        //   >
        //     CRIAR NOVO REGISTRO
        //   </Button>
        // )}
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
