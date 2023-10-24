import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../../services/profile-api';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { isUpdating, update };
}
