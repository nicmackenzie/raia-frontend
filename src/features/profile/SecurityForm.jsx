import { useForm } from 'react-hook-form';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

function SecurityForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values) {}

  return (
    <form
      className="max-w-lg border rounded-md p-2 space-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl label="Old Password" error={errors?.oldPassword?.message}>
        <Input
          type="password"
          variant={errors?.oldPassword ? 'destructive' : 'default'}
          placeholder="Old password"
          {...register('oldPassword', {
            required: 'Old password is required',
          })}
        />
      </FormControl>
      <FormControl label="New Password" error={errors?.password?.message}>
        <Input
          type="password"
          variant={errors?.password ? 'destructive' : 'default'}
          placeholder="New password"
          {...register('password', {
            required: 'New password is required',
            minLength: {
              value: 8,
              message: 'Password has to be 8 characters and above',
            },
          })}
        />
      </FormControl>
      <FormControl
        label="Confirm Password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          variant={errors?.password ? 'destructive' : 'default'}
          placeholder="Confirm password"
          {...register('confirmPassword', {
            required: 'Confirm password',
            minLength: {
              value: 8,
              message: 'Password has to be 8 characters and above',
            },
          })}
        />
      </FormControl>
      <Button>Change Password</Button>
    </form>
  );
}

export default SecurityForm;
