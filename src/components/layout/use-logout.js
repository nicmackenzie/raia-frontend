import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/auth-api';
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem('raia-auth-state');
      navigate('/auth', { replace: true });
    },
  });

  return { isLoggingOut, logout };
}
