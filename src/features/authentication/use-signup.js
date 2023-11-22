import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../services/auth-api';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isSignin, mutate: signup } = useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user);
      localStorage.setItem('raia-auth-state', JSON.stringify(data));
      // navigate('/email-confirmation', { replace: true });
      navigate('/my-profile', { replace: true });
    },
  });

  return { isSignin, signup };
}
