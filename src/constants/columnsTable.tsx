import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MRT_ColumnDef } from 'material-react-table';

import { Client } from '../schemas/clientSchema';
import { TConductor } from '../schemas/conductorSchema';
import { TTravel } from '../schemas/travelSchema';
import { TVehicle } from '../schemas/vehicleSchema';
import 'dayjs/locale/pt-br';

export const clientColumns: MRT_ColumnDef<Client>[] = [
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
];

export const conductorColumns: MRT_ColumnDef<TConductor>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome',
    enableEditing: false
  },
  {
    accessorKey: 'numeroHabilitacao',
    header: 'Número de Habilitação',
    enableEditing: false
  },
  {
    accessorKey: 'catergoriaHabilitacao',
    header: 'Categoria da Habilitação'
  },
  {
    accessorKey: 'vencimentoHabilitacao',
    header: 'Vencimento da Habilitação',
    Cell: ({ cell }) => {
      const value = cell.getValue();
      if (value instanceof Date) {
        return <div>{value.toLocaleDateString('pt-br')}</div>;
      }
      return (
        <div>
          {new Date(cell.getValue<string>()).toLocaleDateString('pt-br')}
        </div>
      );
    },
    Edit: ({ column, table }) => (
      <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Vencimento da Habilitação"
          onChange={(newValue: any) => {
            if (newValue.length < 0)
              alert('Informe a data de vencimento da habilitação!');
            const date = new Date(newValue);
            const { editingRow } = table.getState();
            const { setEditingRow } = table;
            const saveRow = (newValue: Date) => {
              if (editingRow) {
                setEditingRow({
                  ...editingRow,
                  _valuesCache: {
                    ...editingRow._valuesCache,
                    [column.id]: newValue
                  }
                });
              }
            };
            saveRow(date);
          }}
        />
      </LocalizationProvider>
    )
  }
];

export const vehiclesColumns: MRT_ColumnDef<TVehicle>[] = [
  {
    accessorKey: 'placa',
    header: 'Placa',
    enableEditing: false
  },
  {
    accessorKey: 'marcaModelo',
    header: 'Marca Modelo'
  },
  {
    accessorKey: 'anoFabricacao',
    header: 'Ano de Fabricação'
  },
  {
    accessorKey: 'kmAtual',
    header: 'Km Atual'
  }
];
export const travelColumns: MRT_ColumnDef<TTravel>[] = [
  {
    accessorKey: 'idCondutor',
    header: 'Condutor',
    enableEditing: false,
    muiTableBodyCellEditTextFieldProps: {
      sx: { display: 'none' }
    }
  },
  {
    accessorKey: 'idCliente',
    header: 'Cliente',
    enableEditing: false,
    muiTableBodyCellEditTextFieldProps: {
      sx: { display: 'none' }
    }
  },
  {
    accessorKey: 'idVeiculo',
    header: 'Veículo',
    enableEditing: false,
    muiTableBodyCellEditTextFieldProps: {
      sx: { display: 'none' }
    }
  },
  {
    accessorKey: 'kmInicial',
    header: 'KM Inicial',
    enableEditing: false,
    muiTableBodyCellEditTextFieldProps: {
      sx: { display: 'none' }
    }
  },
  {
    accessorKey: 'kmFinal',
    header: 'KM Final'
  },
  {
    accessorKey: 'inicioDeslocamento',
    header: 'Início do Deslocamento',
    enableEditing: false,
    muiTableBodyCellEditTextFieldProps: {
      sx: { display: 'none' }
    },
    Cell: ({ cell }) => {
      const value = cell.getValue();
      if (!value) return null;
      if (value instanceof Date) {
        return <div>{value.toLocaleDateString('pt-br')}</div>;
      }
      return (
        <div>
          {new Date(cell.getValue<string>()).toLocaleDateString('pt-br')}
        </div>
      );
    }
  },
  {
    accessorKey: 'fimDeslocamento',
    header: 'Fim do Deslocamento',
    Cell: ({ cell }) => {
      const value = cell.getValue();
      if (!value) return null;
      if (value instanceof Date) {
        return <div>{value.toLocaleDateString('pt-br')}</div>;
      }
      return (
        <div>
          {new Date(cell.getValue<string>()).toLocaleDateString('pt-br')}
        </div>
      );
    },
    Edit: ({ column, table }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fim de Deslocamento"
          onChange={(newValue: any) => {
            if (newValue.length < 0) alert('Informe a data de encerramento!');
            const date = new Date(newValue);
            const { editingRow } = table.getState();
            const { setEditingRow } = table;
            const saveRow = (newValue: Date) => {
              if (editingRow) {
                setEditingRow({
                  ...editingRow,
                  _valuesCache: {
                    ...editingRow._valuesCache,
                    [column.id]: newValue
                  }
                });
              }
            };
            saveRow(date);
          }}
        />
      </LocalizationProvider>
    ),
    enableEditing: (row) => !!row.original.fimDeslocamento
  },
  {
    accessorKey: 'checkList',
    header: 'CheckList',
    enableEditing: false,
    muiTableBodyCellEditTextFieldProps: {
      sx: { display: 'none' }
    }
  },
  {
    accessorKey: 'motivo',
    header: 'Motivo',
    enableEditing: false,
    muiTableBodyCellEditTextFieldProps: {
      sx: { display: 'none' }
    }
  },
  {
    accessorKey: 'observacao',
    header: 'Observação'
  }
];
