import { Link } from 'react-router-dom';

import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

import defaultUser from '../../assets/default-user.jpg';

function Suggestion({ friend }) {
  return (
    <Link
      to={`/profile/${friend.username}`}
      className="flex items-center gap-2"
      key={friend.id}
    >
      <Avatar src={friend.profile_image || defaultUser} alt="alt" size="sm" />
      <div className="flex flex-col">
        <p className="text-xs text-tertiary font-semibold uppercase">
          {friend.full_name}
        </p>
        <Badge
          className="text-[8px] bg-primary/10 text-primary uppercase "
          size="sm"
        >
          influencer
        </Badge>
      </div>
      <Button
        variant="link"
        className="text-xs text-blue-900 dark:text-blue-200 font-semibold ml-auto"
      >
        Follow
      </Button>
    </Link>
  );
}

export default Suggestion;
