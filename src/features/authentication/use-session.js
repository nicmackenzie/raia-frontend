import { useQuery } from '@tanstack/react-query';
import { getSession } from '../../services/auth-api';

export function useSession() {
  const { isLoading, data } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
  });

  return { isLoading, data };
}
