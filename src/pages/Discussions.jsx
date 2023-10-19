import { Link } from 'react-router-dom';
import { buttonVariants } from '../components/ui/Button';
import Filter from '../components/ui/Filter';
// import { useUser } from '../features/authentication/use-user';
import { useRole } from '../hooks/use-role';
// import CreateDiscussionForm from '../features/discussions/CreateDiscussionForm';
import DiscussionCard from '../features/discussions/DiscussionCard';
import { cn } from '../lib/utils';
import discussions from '../features/discussions/discussionData';
import { topicOptions } from '../features/discussions/CreateDiscussionForm';

function Discussions() {
  // const { data } = useUser();
  const role = useRole();

  // const role = data?.user_metadata?.role.toLowerCase();
  return (
    <>
      <div className="flex items-center">
        {role === 'leader' ? (
          <Link
            to="/discussions/create"
            className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
          >
            Start Discussion
          </Link>
        ) : null}
        <Filter
          filterKey="topic"
          options={[{ value: 'all', label: 'All' }, ...topicOptions]}
          className="lg:ml-auto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
        {discussions.map(discussion => (
          <DiscussionCard key={discussion.id} {...discussion} />
        ))}
      </div>
    </>
  );
}

export default Discussions;
