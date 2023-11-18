import { useSearchParams } from 'react-router-dom';
import Filter from '../../components/ui/Filter';
import BarazaPoll from './BarazaPoll';
import BarazaResources from './BarazaResources';

const OPTIONS = [
  { value: 'polls', label: 'Polls' },
  { value: 'resources', label: 'Resources' },
];

function BarazaActivities() {
  const [searchParams] = useSearchParams();

  const activityType = searchParams.get('activityType') || 'polls';

  return (
    <div className="h-full overflow-y-auto">
      <Filter filterKey="activityType" options={OPTIONS} />
      {activityType === 'polls' && <BarazaPoll />}
      {activityType === 'resources' && <BarazaResources />}
    </div>
  );
}

export default BarazaActivities;
