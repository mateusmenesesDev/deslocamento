import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { clientRequests } from '../services/client';

export default function useClient() {
  const query = useQuery({
    queryKey: ['client'],
    queryFn: clientRequests.findAll
  });
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] });
  //   }
  // });
  return query;
}
