import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';

import iconLogo from '../../assets/logos/raia-final-purple.png';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useSignup } from './use-signup';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';

const options = [
  { value: 'leader', label: 'Leader' },
  { value: 'citizen', label: 'Citizen' },
];

function RegisterForm({ onAuthTypeChange }) {
  const { isSignin, signup } = useSignup();
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState({
    password: { show: false },
    confirmPassword: { show: false },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      fullName: '',
      contact: '',
      email: '',
      password: '',
      confirmPassword: '',
      joiningAs: '',
    },
  });

  function onSubmit(values) {
    signup(values, {
      onError: error => {
        setError(error.message);
      },
      onSuccess: () => {
        setError(false);
      },
    });
  }

  function toggleShowPassword(type) {
    setShowPassword(prev => {
      if (type === 'password') {
        return { ...prev, password: { show: !prev.password.show } };
      }
      return { ...prev, confirmPassword: { show: !prev.confirmPassword.show } };
    });
  }

  return (
    <>
      <div className="max-w-sm w-full flex flex-col mx-2 md:mx-0">
        {error && (
          <Alert
            message={error}
            variant="error"
            className="w-full mb-4"
            onClose={setError}
          />
        )}
        <img
          src={iconLogo}
          alt="Raia logo icon"
          className="w-8 h-8 self-center"
        />
        <header className="self-center mb-4">
          <h1 className="text-lg md:text-xl font-bold text-center">Signup</h1>
          <p className="text-muted-foreground text-sm">
            Create an account with us
          </p>
        </header>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Full Name"
            id="fullName"
            error={errors?.fullName?.message}
          >
            <Input
              variant={errors?.fullName ? 'destructive' : 'outline'}
              id="fullName"
              size="small"
              placeholder="Your full name"
              disabled={isSignin}
              {...register('fullName', {
                required: { value: true, message: 'Name is required' },
              })}
            />
          </FormControl>
          <FormControl
            label="Contact"
            id="contact"
            error={errors?.contact?.message}
          >
            <Input
              variant={errors?.contact ? 'destructive' : 'outline'}
              id="contact"
              size="small"
              disabled={isSignin}
              placeholder="Phone Number"
              {...register('contact', {
                required: { value: true, message: 'Contact is required' },
              })}
            />
          </FormControl>
          <FormControl label="Email" id="email" error={errors?.email?.message}>
            <Input
              variant={errors?.email ? 'destructive' : 'outline'}
              id="email"
              size="small"
              type="email"
              disabled={isSignin}
              placeholder="Email address"
              {...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email ',
                },
              })}
            />
          </FormControl>
          <FormControl
            label="Password"
            id="password"
            error={errors?.password?.message}
          >
            <div className="relative">
              <Input
                variant={errors?.password ? 'destructive' : 'outline'}
                id="password"
                size="small"
                disabled={isSignin}
                type={showPassword.password.show ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', {
                  required: { value: true, message: 'Password is required' },
                  minLength: {
                    value: 6,
                    message: 'Passwords needs to be 6 characters and more',
                  },
                })}
              />
              <button
                onClick={() => toggleShowPassword('password')}
                type="button"
                className="absolute  top-1/2 -translate-y-1/2 right-4 text-muted-foreground"
                aria-label="toggle password show"
              >
                {showPassword.password.show ? (
                  <EyeOff className="w-4 h-4" aria-hidden />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden />
                )}
              </button>
            </div>
          </FormControl>
          <FormControl
            label="Confirm Password"
            id="confirmPassword"
            error={errors?.confirmPassword?.message}
          >
            <div className="relative">
              <Input
                variant={errors?.confirmPassword ? 'destructive' : 'outline'}
                size="small"
                id="confirmPassword"
                type={showPassword.confirmPassword.show ? 'text' : 'password'}
                disabled={isSignin}
                placeholder="Confirm password"
                {...register('confirmPassword', {
                  required: 'This field is required',
                  validate: value =>
                    value === getValues().password || 'Passwords need to match',
                })}
              />
              <button
                onClick={() => toggleShowPassword('confirm')}
                type="button"
                className="absolute  top-1/2 -translate-y-1/2 right-4 text-muted-foreground"
                aria-label="toggle password show"
              >
                {showPassword.confirmPassword.show ? (
                  <EyeOff className="w-4 h-4" aria-hidden />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden />
                )}
              </button>
            </div>
          </FormControl>
          <FormControl
            label="Joining as"
            id="joiningAs"
            error={errors?.joiningAs?.message}
          >
            <Select
              variant={errors?.joiningAs ? 'destructive' : 'outline'}
              id="joiningAs"
              options={options}
              disabled={isSignin}
              size="small"
              placeholder="Select if joining as citizen or leader"
              {...register('joiningAs', {
                required: { value: true, message: 'Select one' },
              })}
            />
          </FormControl>
          <Button
            className="w-full"
            type="submit"
            size="sm"
            disabled={isSignin}
          >
            {!isSignin ? (
              'Sign Up'
            ) : (
              <ButtonLoadingText loadingText="Signing you up..." />
            )}
          </Button>
          <Button
            className="w-full bg-white text-slate-gray-900 hover:bg-gray-100 space-x-2"
            size="sm"
            type="button"
            disabled={isSignin}
            onClick={() => toast.success('Feature coming soon...')}
          >
            <FcGoogle size={24} /> <span>Sign Up with Google</span>
          </Button>
          <p className="text-xs text-center">
            Already have an account?&nbsp;
            <span
              className="text-primary font-semibold cursor-pointer"
              onClick={onAuthTypeChange}
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
