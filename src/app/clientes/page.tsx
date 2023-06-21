import React from 'react';

import Table from '@components/Table';

import { clientRequests } from '../../services/client';
import { IClient } from '../../typings/clients';

export default async function page() {
  const clients: IClient[] = await clientRequests.findAll();
  if (!clients) throw new Error('Nenhum cliente encontrado');
  return (
    <>
      <Table data={clients} />;
    </>
  );
}
