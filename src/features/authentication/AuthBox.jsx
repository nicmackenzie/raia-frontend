import { useSearchParams } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthBox() {
  const [searchParams] = useSearchParams();
  const authType = searchParams.get('type') || 'login';

  return (
    <div className="h-dvh bg-primary/30 flex items-center justify-center">
      {authType === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default AuthBox;
