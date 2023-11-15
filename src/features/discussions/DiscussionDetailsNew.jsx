import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import BarazasSidebar from './BarazasSidebar';
import BarazaDetails from './BarazaDetails';
import BarazasChat from './BarazasConversations';
import BarazaActivities from './BarazaActivities';

import { getDiscussionById } from '../../services/discussions-api';

function DiscussionDetailsNew() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  // const { data } = useUser();

  const {
    isLoading,
    data: discussion,
    error,
  } = useQuery({
    queryFn: () => getDiscussionById(id),
    queryKey: ['barazas', id],
  });

  const selectedTab = searchParams.get('tab') || 'details';
  const locked =
    discussion?.data?.date && new Date() < new Date(discussion?.data.date);
  //   const locked = true;
  return (
    <div className="flex h-[calc(100dvh-4rem)]">
      <BarazasSidebar />
      <div className="hidden md:block h-full flex-1 pl-80">
        {selectedTab === 'details' && (
          <BarazaDetails
            isLoading={isLoading}
            data={discussion?.data}
            error={error}
            locked={locked}
          />
        )}
        {selectedTab === 'conversations' && <BarazasChat locked={locked} />}
        {selectedTab === 'activities' && <BarazaActivities />}
      </div>
    </div>
  );
}

export default DiscussionDetailsNew;
