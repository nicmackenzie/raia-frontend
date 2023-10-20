import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import InfluentialVoice from './InfluentialVoice';
import { getTopVoicesAndLeaders } from '../../services/profile-api';
import { useRole } from '../../hooks/use-role';
import { useUser } from '../../features/authentication/use-user';

function CitizenRightSidebar() {
  const role = useRole();
  const { data: user } = useUser();

  const { data, isLoading } = useQuery({
    queryFn: getTopVoicesAndLeaders,
    queryKey: ['not-following', 'leaders'],
  });

  if (isLoading)
    return (
      <Loader className="hidden md:block w-6 h-6 mx-auto mt-8 animate-spin" />
    );

  return (
    <div className="hidden lg:inline-flex lg:flex-col gap-y-4 w-1/5">
      <div className="w-full p-2 space-y-3">
        <h3 className="text-sm font-bold text-tertiary">Top Voices</h3>
        {data?.followers.length > 0 ? (
          data?.followers?.map(voice => (
            <InfluentialVoice
              key={voice.id}
              avatar={voice.profile_image}
              fullName={voice.full_name}
              points={0}
              username={voice.username}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground text-xs">
            We have no suggestions currently.
          </p>
        )}
      </div>
      {role === 'citizen' && !!user.user.county_id && (
        <div className="w-full p-2 space-y-3">
          <h3 className="text-sm font-bold text-tertiary">Your Leaders</h3>
          {data?.leaders?.length > 0 ? (
            data?.leaders?.map(voice => (
              <InfluentialVoice
                key={voice.id}
                avatar={voice.profile_image}
                averageRating={0}
                position={voice.elected_position}
                username={voice.username}
                fullName={voice.full_name}
                leader
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground text-xs">
              Unable to get your leaders.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CitizenRightSidebar;
