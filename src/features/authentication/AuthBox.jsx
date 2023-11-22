import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useUser } from './use-user.js';

function AuthBox() {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const authType = searchParams.get('type') || 'login';

  useEffect(
    function () {
      if (!isLoading && isAuthenticated) {
        const data = JSON.parse(localStorage.getItem('raia-auth-state'));
        if (!data?.isInitial) {
          navigate('/');
        } else {
          navigate('/my-profile');
        }
      }
    },
    [isLoading, isAuthenticated, navigate]
  );

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
