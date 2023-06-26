import { MRT_ColumnDef } from 'material-react-table';

import { Client } from '../schemas/clientSchema';
import { TConductor } from '../schemas/conductorSchema';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
    muiTableBodyCellEditTextFieldProps: {
      type: 'date',
      onChange: (e) => {
        console.log(e.target.value);
        const date = new Date(e.target.value);
        console.log(
          '🚀 ~ file: Conductor.tsx:60 ~ onEditingRowSave={ ~ date:',
          date
        );
      }
    }
    //   muiTableBodyCellEditTextFieldProps: (props) => {
    //     return (
    //       <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
    //         <DatePicker />
    //       </LocalizationProvider>
    //     );
    //   }
  }
];

// return <div>{cell.getValue<Date>().toLocaleDateString('pt-br')}</div>;

export const vehiclesColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: 'placa',
    header: 'Placa'
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
