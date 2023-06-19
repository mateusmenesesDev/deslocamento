'use client';

import { useState } from 'react';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { clientRequests } from '../../services/client';
import { IClient } from '../../typings/clients';
import { changeObjectKeysToUperCase } from '../../utils/objectKeys';
import TableActions from './TableActions';

type Props = {
  data: IClient[];
};

export default function Table({ data }: Props) {
  const [rowId, setRowId] = useState<string | number>(0);
  const columnsKeys = Object.keys(data[0]);
  const headerNames = changeObjectKeysToUperCase(Object.keys(data[0]));
  const columns: GridColDef[] = columnsKeys.map((key, i) => {
    if (key === 'id') {
      return {
        field: key,
        width: 50,
        editable: false
      };
    }
    return {
      field: key,
      headerName: headerNames[i],
      width: 180,
      editable: true
    };
  });
  columns.push({
    field: 'actions',
    headerName: 'Ações',
    type: 'actions',
    renderCell: (params) => <TableActions {...{ params, rowId, setRowId }} />
  });
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        // editMode="row"
        onCellEditStart={(params) => setRowId(params.id)}
        // onRowEditStart={(row) => {
        //   setRowId(row.id);
        // }}
        // onRowEditCommit={(cell) => {
        //   console.log(cell);

        //   setRowId(cell);
        // }}
        // processRowUpdate={(updatedRow) => {
        //   console.log(updatedRow);

        //   setRowId(updatedRow.id);
        // }}
      />
      {/* {editData.length > 0 && (
        <Button onClick={saveChanges}>Salvar alterações</Button>
      )} */}
    </Box>
  );
}
