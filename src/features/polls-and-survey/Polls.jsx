import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../../components/ui/Button';
import Filter from '../../components/ui/Filter';

function Polls() {
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
    </>
  );
}

export default Polls;
