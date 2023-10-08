import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../services/auth-api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const { isLoading: isSignin, mutate: signup } = useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      console.log(data);
      navigate('/', { replace: true });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { isSignin, signup };
}
