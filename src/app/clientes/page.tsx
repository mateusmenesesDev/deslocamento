import React from 'react';

import { Table } from '@components/Table';

import { Client } from '../../schemas/clientSchema';
import { clientRequests } from '../../services/client';

export const revalidate = 5;
export default async function page() {
  const clients: Client[] = await clientRequests.findAll();
  if (!clients) throw new Error('Nenhum cliente encontrado');
  return (
    <>
      <Table.Client data={clients} />;
    </>
  );
}
