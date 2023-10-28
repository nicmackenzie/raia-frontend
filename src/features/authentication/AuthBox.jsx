import { useSearchParams } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const authType = searchParams.get('type') || 'login';

  function handleChangeAuth() {
    authType === 'login'
      ? searchParams.set('type', 'register')
      : searchParams.set('type', 'login');
    setSearchParams(searchParams);
  }

  return (
    <div className="h-dvh bg-primary/10 flex items-center justify-center">
      {authType === 'login' ? (
        <LoginForm onAuthTypeChange={handleChangeAuth} />
      ) : (
        <RegisterForm onAuthTypeChange={handleChangeAuth} />
      )}
    </div>
  );
}

export default AuthBox;
