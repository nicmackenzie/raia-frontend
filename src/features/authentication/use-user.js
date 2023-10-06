import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/auth-api';

/**
 * A custom hook that will get the details of the currently logged user
 */

export function useUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    isAuthenticated: data?.role === 'authenticated',
    error,
    data,
  };
}
