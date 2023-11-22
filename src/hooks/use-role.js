import { useUser } from '../features/authentication/use-user';

export function useRole() {
  const { user } = useUser();
  return user?.role === 'citizen' || (user?.role === 'leader' && !user.verified)
    ? 'citizen'
    : 'leader';
}
