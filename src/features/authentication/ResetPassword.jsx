import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useUser } from './use-user';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { notificationInitialState } from '../../lib/utils';
import Alert from '../../components/ui/Alert';
import { sendResetPassword } from '../../services/auth-api';

function ResetPassword() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(notificationInitialState);
  const [displayForm, setDisplayForm] = useState(true);
  const { isLoading, mutate: resetPassword } = useMutation({
    mutationFn: sendResetPassword,
    onSuccess: () => {
      setNotification({
        displayed: true,
        message: 'A reset email has been sent to the email address provided.',
        variant: 'success',
      });
      setDisplayForm(false);
    },
    onError: err => {
      setNotification({
        displayed: true,
        message: err.message,
        variant: 'error',
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '' } });

  if (isAuthenticated) {
    navigate('/');
  }

  function resetNotification() {
    setNotification(notificationInitialState);
  }

  function onSubmit({ email }) {
    resetPassword(email);
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="max-w-sm w-full space-y-4">
        {notification.displayed && (
          <Alert
            message={notification.message}
            variant={notification.variant}
            dismissable={displayForm}
            onClose={resetNotification}
          />
        )}
        {displayForm && (
          <form
            className="p-4 border rounded-md space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl
              id="email"
              error={errors?.email?.message}
              label="Email"
            >
              <Input
                type="email"
                variant={errors?.email ? 'destructive' : 'default'}
                placeholder="Enter your email address..."
                id="email"
                disabled={isLoading}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Provide a valid email',
                  },
                })}
              />
            </FormControl>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <ButtonLoadingText loadingText="Submitting..." />
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}

export default ResetPassword;
