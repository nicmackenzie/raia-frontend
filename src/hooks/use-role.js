import { useUser } from '../features/authentication/use-user';

export function useRole() {
  const { data } = useUser();
  return data?.user?.role === 'citizen' ||
    (data?.user?.role === 'leader' && !data?.user.verified)
    ? 'citizen'
    : 'leader';
}
