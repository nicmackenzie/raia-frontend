import { format } from 'timeago.js';
import { cn } from '../../lib/utils';

function SingleMessage({ date, isMine, message }) {
  return (
    <div
      className={cn(
        ' rounded-md w-max px-2 py-0.5  space-y-0.5',
        isMine
          ? 'bg-primary/10 text-primary self-end'
          : 'bg-secondary self-start'
      )}
    >
      <p className="text-sm text-tertiary">{message}</p>
      <span className="text-xs text-muted-foreground">
        {format(new Date(date))}
      </span>
    </div>
  );
}

export default SingleMessage;
