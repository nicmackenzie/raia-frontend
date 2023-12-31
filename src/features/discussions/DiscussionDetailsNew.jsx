import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import BarazasSidebar from './BarazasSidebar';
import BarazaDetails from './BarazaDetails';
import BarazasChat from './BarazasConversations';
import BarazaActivities from './BarazaActivities';

import { getDiscussionById } from '../../services/discussions-api';
import { socket } from '../../lib/utils';
import { useUser } from '../authentication/use-user';

function DiscussionDetailsNew() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useUser();

  const selectedTab = searchParams.get('tab') || 'details';

  useEffect(() => {
    if (!user || !socket) return;

    const user = {
      id: user.id,
      fullName: user.full_name,
      avatar: user.profile_image,
      username: user.username,
    };

    socket.emit('online:baraza:users', user);

    const handleOnlineUsers = updatedOnlineUsers => {
      setOnlineUsers(updatedOnlineUsers);
    };

    socket.on('online:users', handleOnlineUsers);

    return () => {
      socket.off('online:users', handleOnlineUsers);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, socket]);

  useEffect(
    function () {
      if (selectedTab !== 'activities' && searchParams.get('activityType')) {
        searchParams.delete('activityType');
      }
    },
    [searchParams, selectedTab]
  );

  const {
    isLoading,
    data: discussion,
    error,
  } = useQuery({
    queryFn: () => getDiscussionById(id),
    queryKey: ['barazas', id],
  });

  const locked =
    discussion?.data?.date && new Date() < new Date(discussion?.data.date);
  //   const locked = true;
  return (
    <div className="flex h-[calc(100dvh-4rem)]">
      <BarazasSidebar onlineUsers={onlineUsers} />
      <div className="hidden md:block h-full flex-1 pl-80">
        {selectedTab === 'details' && (
          <BarazaDetails
            isLoading={isLoading}
            data={discussion?.data}
            upvotes={discussion?.upvotes}
            upvoted={discussion?.hasUpvoted}
            error={error}
            locked={locked}
          />
        )}
        {selectedTab === 'conversations' && (
          <BarazasChat
            locked={locked}
            endDate={discussion?.data?.end_datetime}
          />
        )}
        {selectedTab === 'activities' && <BarazaActivities />}
      </div>
    </div>
  );
}

export default DiscussionDetailsNew;
