import { Link } from 'react-router-dom';
import { buttonVariants } from '../components/ui/Button';
import Filter from '../components/ui/Filter';
// import { useUser } from '../features/authentication/use-user';
// import { useRole } from '../hooks/use-role';
// import CreateDiscussionForm from '../features/discussions/CreateDiscussionForm';
import DiscussionCard from '../features/discussions/DiscussionCard';
import { cn } from '../lib/utils';
// import discussions from '../features/discussions/discussionData';
import { topicOptions } from '../features/discussions/CreateDiscussionForm';
import { getDiscussions } from '../services/discussions-api';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/Select2';

function Discussions() {
  // const role = useRole();

  const { isLoading, data } = useQuery({
    queryFn: () => getDiscussions(),
    queryKey: ['discussions'],
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <Link
          to="/discussions/create"
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          Start Discussion
        </Link>

        <Select>
          <SelectTrigger className="w-full md:w-60">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {[{ value: 'all', label: 'All' }, ...topicOptions].map(item => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-max">
        <Filter
          filterKey="topic"
          options={[
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'past', label: 'Past Barazas' },
          ]}
          className="lg:ml-auto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
        {data.map(discussion => (
          <DiscussionCard key={discussion.id} {...discussion} />
        ))}
      </div>
    </div>
  );
}

export default Discussions;
