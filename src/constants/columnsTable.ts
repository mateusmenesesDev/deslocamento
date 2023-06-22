import { MRT_ColumnDef } from 'material-react-table';

import { Client } from '../schemas/clientSchema';
import { TConductor } from '../schemas/conductorSchema';

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
    header: 'Nome'
  },
  {
    accessorKey: 'numeroHabilitacao',
    header: 'Número de Habilitação'
  },
  {
    accessorKey: 'categoriaHabilitacao',
    header: 'Categoria da Habilitação'
  },
  {
    accessorKey: 'vencimentoHabilitacao',
    header: 'Vencimento da Habilitação'
  }
];

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
