import { useQuery } from '@tanstack/react-query';
import { getCounties } from '../services/counties-api';

export function useCounties() {
  const {
    isLoading,
    data: counties,
    error,
  } = useQuery({
    queryFn: getCounties,
    queryKey: ['counties'],
  });

  return { isLoading, counties, error };
}
