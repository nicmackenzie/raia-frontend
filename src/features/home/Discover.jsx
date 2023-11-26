import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '../../components/ui/Skeleton';
import SearchFriend from './SearchFriend';

import { getFriendSuggestions } from '../../services/feeds-api';
import Suggestion from './Suggestion';

function Discover() {
  const { isLoading, data, error } = useQuery({
    queryFn: getFriendSuggestions,
    queryKey: ['friend-suggestions'],
  });

  return (
    <div className="max-w-sm w-full mt-4 h-max space-y-4">
      <SearchFriend />
      {isLoading &&
        Array.from({ length: 5 }, (_, i) => <SkeletonPlaceholder key={i} />)}

      {!isLoading &&
        !error &&
        data.data.map(friend => <Suggestion key={friend.id} friend={friend} />)}
    </div>
  );
}

function SkeletonPlaceholder() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="rounded-full w-10 h-10" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-40 h-4" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export default Discover;
