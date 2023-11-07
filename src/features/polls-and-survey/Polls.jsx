import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useQuery } from '@tanstack/react-query';

import { buttonVariants } from '../../components/ui/Button';
import Filter from '../../components/ui/Filter';
import Alert from '../../components/ui/Alert';
import Loader from '../../components/ui/Loader';

import { getPolls } from '../../services/polls-api';
import PollItem from './PollItem';

function Polls() {
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get('type') || 'ongoing';

  const { isLoading, data, error } = useQuery({
    queryFn: () => getPolls(filterType),
    queryKey: ['polls', filterType],
  });
  if (isLoading) return <Loader type="spinner" size="md" />;
  return (
    <>
      <div className="flex flex-col md:flex-row  md:items-center md:justify-between gap-4 mt-4">
        <Link
          className={cn(buttonVariants({ variant: 'default' }))}
          to="polls/new"
        >
          Create a poll
        </Link>
        <Filter
          filterKey="type"
          options={[
            { value: 'ongoing', label: 'Ongoing' },
            { value: 'mine', label: 'My Polls' },
          ]}
          className="[&>*]:grow"
        />
      </div>
      {error && <Alert message={error} variant="error" dismissable={false} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {data &&
          data.map(poll => (
            <PollItem
              key={poll.id}
              id={poll.id}
              endDate={poll.end_date}
              votes={poll.count}
              user={poll.user}
              question={poll.question}
              options={poll.options}
              voters={poll.voters}
            />
          ))}
      </div>
    </>
  );
}

export default Polls;
