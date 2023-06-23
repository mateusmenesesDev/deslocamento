import { Dispatch, SetStateAction } from 'react';

import { type MRT_Row } from 'material-react-table';

interface DataType<T> {
  dataTable: T[];
  setDataTable: Dispatch<SetStateAction<T[]>>;
}

export interface NewRowProps<T> extends DataType<T> {
  values: T;
}

export interface DeleteRowProps<T extends Record<string, any>>
  extends DataType<T> {
  row: MRT_Row<T>;
}

export interface EditRowProps<T> extends DataType<T> {
  MUI: any;
}
