'use client';

import { useState } from 'react';

import DeleteButton from '@components/DeleteButton';
import EditButton from '@components/EditButton';

import {
  createNewRow,
  handleDeleteRow,
  handleSaveRowEdit
} from '@lib/vehicleTableCrud';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MaterialReactTable } from 'material-react-table';

import { vehiclesColumns } from '../../constants/columnsTable';
import { TVehicle } from '../../schemas/vehicleSchema';
import { tableConfig } from './config';
import { NewVehicle } from './Create/NewVehicle';
import { validateEditVehicle } from '@lib/validateEdit';

type Props = {
  data: TVehicle[];
};

export default function Vehicle({ data }: Props) {
  const columns = vehiclesColumns;
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ordededData = data.reverse();
  const [dataTable, setDataTable] = useState(ordededData);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5">
        Total de veículos: {dataTable.length}
      </Typography>
      <Box sx={{ marginY: '10px' }}>
        <Button
          color="secondary"
          onClick={() => setCreateModalOpen(true)}
          variant="contained"
        >
          ADICIONAR NOVO VEÍCULO
        </Button>
      </Box>
      <MaterialReactTable
        {...tableConfig}
        state={{ showProgressBars: isLoading, isLoading }}
        columns={columns}
        data={dataTable ?? []}
        onEditingRowSave={async (MUI) => {
          validateEditVehicle(MUI.values);
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
      <NewVehicle
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
