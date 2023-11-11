import Stats from './Stats';
import Filter from '../../components/ui/Filter';
import Issue from './Issue';
import defaultUser from '../../assets/default-user.jpg';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'answered', label: 'Answered' },
  { value: 'closed', label: 'Closed' },
];

function LeaderTickets() {
  return (
    <div className="space-y-4">
      <Stats />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Filter
          filterKey="status"
          options={FILTER_OPTIONS}
          defaultTab="pending"
          className="w-max"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Issue
          fullName="Mellis Goldbridge"
          userName="@mechakra"
          src={defaultUser}
          title="Too much delays"
        />
      </div>
    </div>
  );
}

export default LeaderTickets;
