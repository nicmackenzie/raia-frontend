import { Link } from 'react-router-dom';
import Avatar from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import userPlaceholder from '../../assets/default-user.jpg';

function EventAttendee({ hostid, id, profile_image, full_name, username }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      <Avatar
        src={profile_image || userPlaceholder}
        alt={`avatar for ${full_name}`}
        size="xl"
      />
      <Link
        className="text-xs text-tertiary font-semibold transition-all hover:underline hover:text-primary"
        to={`/profile/${username}`}
      >
        {full_name}
      </Link>
      {hostid === id && <Badge variant="gold">Event Host</Badge>}
    </div>
  );
}

export default EventAttendee;
