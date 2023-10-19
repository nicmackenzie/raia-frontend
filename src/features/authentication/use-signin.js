import { useMutation } from '@tanstack/react-query';
import { signInWithPassword } from '../../services/auth-api';
import { useNavigate } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

export function useSignIn() {
  // const [searchParams] = useSearchParams();
  // const signInType = searchParams.get('auth-type') || 'with-password';
  // console.log(signInType);
  const navigate = useNavigate();
  const { isLoading, mutate: signin } = useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      if (import.meta.env.DEV) {
        navigate('/', { replace: true });
      } else {
        navigate('/email-confirmation', { replace: true });
      }
    },
  });

  return { isLoading, signin };
}
