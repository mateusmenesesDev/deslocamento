import React from 'react';

import { Table } from '@components/Table';

import { TConductor } from '../../schemas/conductorSchema';
import { conductorRequest } from '../../services/conductor';

export const revalidate = 5;
export default async function page() {
  const conductor: TConductor[] = await conductorRequest.findAll();
  if (!conductor) throw new Error('Nenhum cliente encontrado');
  return (
    <>
      Total de clientes: {conductor.length}
      <Table.Conductor data={conductor} />;
    </>
  );
}
