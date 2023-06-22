import { Dispatch, SetStateAction } from 'react';

import { type MRT_Row } from 'material-react-table';

import { Client } from '../schemas/clientSchema';

interface DataType {
  dataTable: Client[];
  setDataTable: Dispatch<SetStateAction<Client[]>>;
}

export interface NewRowProps extends DataType {
  values: Client;
}

export interface DeleteRowProps extends DataType {
  row: MRT_Row<Client>;
}

export interface EditRowProps {
  MUI: any;
  dataTable: Client[];
  setDataTable: Dispatch<SetStateAction<Client[]>>;
}
