import { Calendar, ChevronsUp, Clock, User } from 'lucide-react';

import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import ActionToolTip from '../../components/ui/ActionToolTip';

import {
  cn,
  formatDateDistance,
  formatMinutesToHoursAndMinutes,
} from '../../lib/utils';
import { differenceInMinutes } from 'date-fns';
import CommentSection from './CommentSections';

function BarazaDetails({ isLoading, error, data, locked }) {
  if (isLoading) return <Loader type="spinner" />;
  if (error)
    return (
      <Alert
        variant="error"
        message={error.message}
        dismissable={false}
        className="mt-6"
      />
    );

  const { title, content, date, topic, user, end_datetime } = data;

  const minutes =
    date &&
    end_datetime &&
    differenceInMinutes(new Date(end_datetime), new Date(date));
  return (
    <div
      className={cn('px-4 py-2 space-y-6', locked ? 'space-y-12' : 'space-y-8')}
    >
      <article className="space-y-4">
        <header className="text-center space-y-2 flex items-center gap-4 justify-center">
          <ActionToolTip label="Upvote baraza">
            <button className="px-2 border border-primary/10 py-1 self-stretch rounded-xl transition-colors hover:bg-primary/10">
              <ChevronsUp className="text-gold" />
            </button>
          </ActionToolTip>
          <div>
            <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              {content}
            </p>
          </div>
        </header>
        <div className="flex flex-col gap-4 items-start md:flex-row md:items-center md:justify-evenly">
          <div className="flex gap-1 items-center">
            <User className="w-4 h-4 text-primary/50" />
            <span className="text-xs text-tertiary font-medium">
              Created by {user?.full_name}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <Calendar className="w-4 h-4 text-primary/50" />
            <span className="text-xs text-tertiary font-medium">
              {date && formatDateDistance(date, new Date())}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <Clock className="w-4 h-4 text-primary/50" />
            <span className="text-xs text-tertiary font-medium">
              {minutes &&
                minutes > 0 &&
                formatMinutesToHoursAndMinutes(minutes)}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <ChevronsUp className="w-4 h-4 text-primary/50" />
            <span className="text-xs text-tertiary font-medium">0 upvotes</span>
          </div>
          <Badge variant="ghost" className="bg-primary/10 text-primary">
            {topic.toUpperCase()}
          </Badge>
        </div>
      </article>
      {!locked ? (
        <CommentSection comments={data?.comments} />
      ) : (
        <p className="text-lg md:text-xl text-center font-semibold text-muted-foreground mt-16">
          Comment section is locked until the baraza is live
        </p>
      )}
    </div>
  );
}

export default BarazaDetails;
