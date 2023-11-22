import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInWithPassword } from '../../services/auth-api';
import { useNavigate } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const signInType = searchParams.get('auth-type') || 'with-password';
  // console.log(signInType);
  const { isLoading, mutate: signin } = useMutation({
    mutationFn: signInWithPassword,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user);
      localStorage.setItem('raia-auth-state', JSON.stringify(data));
      navigate('/', { replace: true });
    },
  });

  return { isLoading, signin };
}
