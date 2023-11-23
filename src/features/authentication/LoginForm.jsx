import toast from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
// import iconLogo from '../../../public/logos/raia-icon-purple.png';
import iconLogo from '../../assets/logos/raia-final-purple.png';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useForm } from 'react-hook-form';
import { useSignIn } from './use-signin';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

function LoginForm({ onAuthTypeChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isLoading, signin } = useSignIn();

  function onSubmit(values) {
    searchParams.set('auth-type', 'signin-with-password');
    setSearchParams(searchParams);
    signin(
      { email: values.email, password: values.password },
      {
        onError: error => {
          toast.error(error.message);
          reset();
        },
      }
    );
  }

  function toggleShowPassword() {
    setShowPassword(prev => !prev);
    // searchParams.set('auth-type', 'oauth');
    // setSearchParams(searchParams);
    // signin();
  }

  return (
    <div className="max-w-sm w-full flex flex-col mx-2 md:mx-0">
      <img
        src={iconLogo}
        alt="Raia logo icon"
        className="w-12 h-12 self-center"
      />
      <header className="self-center mb-4">
        <h1 className="text-lg md:text-xl font-bold text-center">
          Log in to your account
        </h1>
        <p className="text-muted-foreground text-sm">
          Welcome back. Please enter your details
        </p>
      </header>
      <form className="space-y-4 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Email" id="email" error={errors?.email?.message}>
          <Input
            placeholder="Enter your email"
            className="bg-gray-50 "
            variant={errors?.email?.message ? 'destructive' : 'outline'}
            type="email"
            id="email"
            disabled={isLoading}
            {...register('email', {
              required: { value: true, message: 'Email is required' },
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
              placeholder="Enter your password"
              className="bg-gray-50 pr-12"
              variant={errors?.password?.message ? 'destructive' : 'outline'}
              type={showPassword ? 'text' : 'password'}
              id="password"
              disabled={isLoading}
              {...register('password', {
                required: { value: true, message: 'Password is required' },
              })}
            />
            <button
              onClick={toggleShowPassword}
              type="button"
              className="absolute  top-1/2 -translate-y-1/2 right-4 text-muted-foreground"
              aria-label="toggle password show"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" aria-hidden />
              ) : (
                <Eye className="w-4 h-4" aria-hidden />
              )}
            </button>
          </div>
        </FormControl>
        <Link
          className="mt-1 text-primary text-sm block text-right font-semibold"
          to="/password-reset"
        >
          Forgot your password?
        </Link>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {!isLoading ? (
            'Sign In'
          ) : (
            <ButtonLoadingText loadingText="Signin in..." />
          )}
        </Button>
        <Button
          type="button"
          onClick={() => toast.success('Feature coming soon')}
          className="w-full bg-white text-slate-900 font-semibold space-x-2 hover:bg-gray-100"
          disabled={isLoading}
        >
          <FcGoogle size={24} />
          <span>Sign In with Google</span>
        </Button>
      </form>
      <p className="text-xs text-center">
        Don&#39;t have an account?&nbsp;
        <span
          className="text-primary font-semibold cursor-pointer"
          onClick={onAuthTypeChange}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
