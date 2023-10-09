import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../services/auth-api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isSignin, mutate: signup } = useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data?.user);
      navigate('/', { replace: true });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { isSignin, signup };
}
