import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../services/auth-api';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const { isLoading: isSignin, mutate: signup } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // queryClient.setQueryData(['user'], data?.user);
      navigate('/email-confirmation', { replace: true });
    },
  });

  return { isSignin, signup };
}
