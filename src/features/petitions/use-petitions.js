import { useQuery } from '@tanstack/react-query';
import { getPetitions } from '../../services/petitions-api';

export function usePetitions() {
  const {
    isLoading,
    data: petitions,
    error,
  } = useQuery({
    queryFn: getPetitions,
    queryKey: ['petitions'],
  });

  return { isLoading, petitions, error };
}
