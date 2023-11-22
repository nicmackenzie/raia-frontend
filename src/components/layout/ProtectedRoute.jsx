import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../features/authentication/use-user';
import Loader from '../ui/Loader';
/**
 * This component will be used to protect routes that will need authentication for access.
 * It will redirect unauthenticated users to the auth page
 */

// TODO: ADD Error handling once reusable alert component is created
function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated, error, status } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated && status !== 'success')
        navigate('/auth');
    },
    [isLoading, isAuthenticated, navigate, status]
  );

  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
