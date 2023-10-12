import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import iconLogo from '../../assets/logos/raia-final-purple.png';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { useSignup } from './use-signup';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';

const options = [
  { value: 'leader', label: 'Leader' },
  { value: 'citizen', label: 'Citizen' },
];

function RegisterForm({ onAuthTypeChange }) {
  const { isSignin, signup } = useSignup();
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
    signup(values);
  }

  return (
    <div className="max-w-sm w-full flex flex-col  mx-2 md:mx-0">
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
          <Input
            variant={errors?.password ? 'destructive' : 'outline'}
            id="password"
            size="small"
            disabled={isSignin}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: {
                value: 6,
                message: 'Passwords needs to be 6 characters and more',
              },
            })}
          />
        </FormControl>
        <FormControl
          label="Confirm Password"
          id="confirmPassword"
          error={errors?.confirmPassword?.message}
        >
          <Input
            variant={errors?.confirmPassword ? 'destructive' : 'outline'}
            size="small"
            id="confirmPassword"
            type="password"
            disabled={isSignin}
            placeholder="Confirm password"
            {...register('confirmPassword', {
              required: 'This field is required',
              validate: value =>
                value === getValues().password || 'Passwords need to match',
            })}
          />
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
        <Button className="w-full" type="submit" size="sm" disabled={isSignin}>
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
  );
}

export default RegisterForm;
