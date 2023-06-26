import { MRT_ColumnDef } from 'material-react-table';

import { Client } from '../schemas/clientSchema';
import { TConductor } from '../schemas/conductorSchema';
import { TVehicle } from '../schemas/vehicleSchema';
import { TTravel } from '../schemas/travelSchema';

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
    accessorKey: 'condutor',
    header: 'Condutor'
  },
  {
    accessorKey: 'cliente',
    header: 'Cliente'
  },
  {
    accessorKey: 'veiculo',
    header: 'Veículo'
  },
  {
    accessorKey: 'kmInicial',
    header: 'KM Inicial',
    enableEditing: false
  },
  {
    accessorKey: 'kmFinal',
    header: 'KM Final'
  },
  {
    accessorKey: 'inicioDeslocamento',
    header: 'Início do Deslocamento'
  },
  {
    accessorKey: 'fimDeslocamento',
    header: 'Fim do Deslocamento'
  },
  {
    accessorKey: 'checkList',
    header: 'CheckList'
  },
  {
    accessorKey: 'motivo',
    header: 'Motivo'
  },
  {
    accessorKey: 'observacao',
    header: 'Observacao'
  }
];
