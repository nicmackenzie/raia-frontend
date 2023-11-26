import { useQuery } from '@tanstack/react-query';

import Alert from '../../components/ui/Alert';
import Feed from './Feed';
import PostForm from './PostForm';

import { getFeeds } from '../../services/feeds-api';

function NewsFeed() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['feeds'],
    queryFn: getFeeds,
  });

  return (
    <div className="space-y-3">
      <PostForm />

      {!isLoading && error && (
        <Alert
          variant="error"
          message="Unable to retrieve feeds at this time"
          dismissable={false}
        />
      )}
      {isLoading &&
        Array.from({ length: 5 }, (_, i) => <Feed.Skeleton key={i} />)}
      {!isLoading &&
        !error &&
        data.data.map(feed => <Feed key={feed.id} {...feed} />)}
    </div>
  );
}

export default NewsFeed;
