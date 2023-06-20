import { Dispatch, SetStateAction } from 'react';

import { MRT_Row } from 'material-react-table';

import { IClient } from './clients';

interface DataType {
  dataTable: IClient[];
  setDataTable: Dispatch<SetStateAction<IClient[]>>;
}

export interface NewRowProps extends DataType {
  values: IClient;
}

export interface DeleteRowProps extends DataType {
  row: MRT_Row<IClient>;
}

export interface EditRowProps {
  MUI: any;
  dataTable: IClient[];
  setDataTable: Dispatch<SetStateAction<IClient[]>>;
}
