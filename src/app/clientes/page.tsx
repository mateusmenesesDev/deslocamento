import Table from '@components/Table';

import { clientRequests } from '../../services/client';
import { IClient } from '../../typings/clients';

export default async function page() {
  const clients: IClient[] = await clientRequests.findAll();
  if (!clients) throw new Error('Nenhum cliente encontrado');
  return clients.map((cliente, i) => <p key={i}>{cliente.nome}</p>);
}
