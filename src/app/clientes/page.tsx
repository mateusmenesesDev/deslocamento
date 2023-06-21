import Table from '@components/Table';

import { clientRequests } from '../../services/client';
import { IClient } from '../../typings/clients';

export default async function page() {
  const request = await fetch(
    'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
    { next: { tags: ['clientes'] } }
  );
  const clients: IClient[] = await request.json();
  if (!clients) throw new Error('Nenhum cliente encontrado');
  return clients.map((cliente, i) => <p key={i}>{cliente.nome}</p>);
}
