import Avatar from '../../components/ui/Avatar';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock } from 'lucide-react';
import timeElapsed from './dateTime';
import { format } from 'date-fns';
import {
  dateDiffInMinutes,
  formatMinutesToHoursAndMinutes,
} from '../../lib/utils';

function DiscussionCard({
  title,
  id,
  user,
  created_at,
  content,
  date,
  end_datetime,
}) {
  const minutes = dateDiffInMinutes(end_datetime, date);

  return (
    <div className="bg-background rounded-lg shadow-md py-2 px-4 space-y-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Avatar
            src="https://i.pravatar.cc/48?u=9i9q21eqe"
            alt="avatar for user"
          />
          <div>
            <div className="text-sm font-semibold">{user.full_name}</div>
            <p className="text-xs text-muted-foreground">
              {timeElapsed(created_at)}
            </p>
          </div>
        </div>
        <Badge size="sm">Education</Badge>
      </header>
      <div className="space-y-1.5">
        <Link to={`/discussions/${id}`}>
          <h3 className="text-base lg:text-lg font-semibold transition-colors hover:text-primary">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">
          {content}...{' '}
          <Link to={`/discussions/${id}`}>
            <span className="font-semibold text-primary">Read More</span>
          </Link>
        </p>
      </div>
      <footer className="flex items-center gap-4">
        <div className="flex gap-1 items-center">
          <Calendar className="w-4 h-4 text-primary/50" />
          <span className="text-muted-foreground text-xs font-medium">
            {format(new Date(date), 'dd MMM yy')} at{' '}
            {format(new Date(date), 'HH:mm')}
          </span>
        </div>
        <div className="flex gap-0.5 items-center">
          <Clock className="w-4 h-4 text-primary/50" />
          <span className="text-muted-foreground text-xs font-medium">
            {formatMinutesToHoursAndMinutes(minutes)}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default DiscussionCard;
