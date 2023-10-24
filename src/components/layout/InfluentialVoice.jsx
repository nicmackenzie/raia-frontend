import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { numberFormatter } from '../../lib/utils';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Badge } from '../ui/Badge';
import StarRating from '../ui/StarRating';

function InfluentialVoice({
  avatar,
  fullName,
  username,
  // points,
  leader,
  position,
  averageRating,
}) {
  const [following, setFollowing] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar src={avatar} alt={`${fullName} avatar`} size="sm" />
        <div className="flex flex-col">
          <Link
            className="text-xs font-semibold capitalize"
            to={`/profile/${username}`}
          >
            {fullName}
          </Link>
          <span className="text-[10px] text-muted-foreground">
            {leader ? position?.toUpperCase() : 'PIONEER'}
          </span>
        </div>
      </div>
      {!leader ? (
        !following ? (
          <Button
            className="h-6 rounded-sm px-1 text-[10px] py-1"
            onClick={() => setFollowing(true)}
          >
            Follow
          </Button>
        ) : (
          <Badge variant="outline">Following</Badge>
        )
      ) : (
        <div className="flex flex-col">
          <div className="text-[10px] text-muted-foreground">
            Average rating
          </div>
          <StarRating
            defaultRating={Math.round(averageRating)}
            isClickable={false}
          />
        </div>
      )}
    </div>
  );
}

export default InfluentialVoice;
