import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

import Avatar from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { getProfile } from '../../services/profile-api';
import StarRating from '../../components/ui/StarRating';
import { createConversation } from '../../services/conversations-api';
import { useMessage } from '../../context/messages-context';

function ProfileView() {
  const [userInfo, setUserInfo] = useState({});
  const { username } = useParams();
  const navigate = useNavigate();
  const { onConversationSelect } = useMessage();

  const { isLoading, data } = useQuery({
    queryFn: () => getProfile(username),
    queryKey: ['user-profile', username],
  });

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createConversation,
    onSuccess: data => {
      onConversationSelect(data?.conversation_id);
      navigate('/messages');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  useEffect(
    function () {
      setUserInfo(data);
    },
    [username, data]
  );

  if (isLoading) return <Loader />;

  function handleConversation() {
    mutate(data.id);
  }

  return (
    <header className="min-h-[13rem] bg-background shadow rounded-sm pb-8">
      <div className="bg-gradient-to-r from-gold/30 to-primary/30 h-24 relative">
        <Avatar
          src={userInfo?.profile_image}
          className="w-20 h-20 absolute left-16 md:left-20 -bottom-10"
          alt={`avatar for ${userInfo?.full_name}`}
        />
      </div>
      <div className="pt-12 px-6 flex flex-col gap-6 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg md:text-xl lg:3xl font-bold">
            {userInfo?.full_name}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-sm md:text-base -mt-1">
              @{userInfo?.username}
            </p>
            <Badge variant="default" className="text-[10px] py-[1px]">
              {userInfo?.role === 'citizen'
                ? 'Pioneer'
                : userInfo?.elected_position?.toUpperCase()}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-1">
            {userInfo?.role === 'leader' && (
              <>
                <StarRating
                  defaultRating={3}
                  isClickable={false}
                  displayValue={false}
                />
                <Link
                  to={`/review/${username}`}
                  className="text-xs text-primary font-semibold transition-all hover:underline"
                >
                  Review {userInfo?.full_name}
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button size="xs" onClick={handleConversation} disabled={isCreating}>
            Message
          </Button>
          {userInfo?.role === 'citizen' && (
            <Button size="xs" variant="secondary" disabled={isCreating}>
              Follow
            </Button>
          )}
          <Button variant="ghost" size="xs" disabled={isCreating}>
            <MoreVertical />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default ProfileView;
