import { useState } from 'react';
import { Link } from 'react-router-dom';
import { differenceInDays } from 'date-fns';

import { Badge } from '../../components/ui/Badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/Modal';
import { useUser } from '../authentication/use-user';
import { useOutsideClick } from '../../hooks/use-outside-click';
import PollContent from './PollContent';
import { cn } from '../../lib/utils';

function PollItem({ question, endDate, user, votes, options, id, voters }) {
  const days = differenceInDays(new Date(endDate), new Date());
  const ref = useOutsideClick(handleClose);

  const [open, setOpen] = useState(false);
  const { user: loggedUser } = useUser();

  function handleClose() {
    setOpen(false);
  }

  const isOwner = loggedUser?.id === user.id;
  const hasVoted = voters?.some(voter => voter.id === loggedUser?.id);

  return (
    <>
      {isOwner ? (
        <Link
          to={`${id}`}
          className="rounded-md border px-4 py-2 space-y-2 cursor-pointer"
        >
          <Poll
            days={days}
            votes={votes}
            isOwner={isOwner}
            user={user}
            question={question}
            hasVoted={hasVoted}
          />
        </Link>
      ) : (
        <div
          className="rounded-md border px-4 py-2 space-y-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Poll
            days={days}
            votes={votes}
            question={question}
            isOwner={isOwner}
            user={user}
            hasVoted={hasVoted}
          />
        </div>
      )}
      <Dialog open={open}>
        <DialogContent ref={ref} onClose={handleClose}>
          <DialogHeader>
            <DialogTitle>Poll Voting</DialogTitle>
          </DialogHeader>
          <PollContent
            question={question}
            options={options}
            pollId={id}
            onClose={handleClose}
            hasVoted={hasVoted}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function Poll({ days, user, question, votes, isOwner, hasVoted }) {
  return (
    <>
      <Badge
        size="sm"
        className={cn(
          'text-[10px] font-semibold',
          !hasVoted ? 'bg-primary/10 text-primary' : ''
        )}
        variant="success"
      >
        {!hasVoted && days === 0 && 'Only today left'}
        {!hasVoted &&
          days > 0 &&
          `${days} ${days > 1 ? ' days remaining' : ' remaining'}`}
        {hasVoted && 'You have already voted'}
      </Badge>
      <p className="text-sm font-semibold text-tertiary">{question}</p>
      <div className="flex items-center justify-between text-xs">
        {isOwner ? (
          <p className="text-muted-foreground font-semibold">My Poll</p>
        ) : (
          <Link to={`/profile/${user.username}`} className="">
            Created By {user?.full_name}
          </Link>
        )}
        <p className="text-muted-foreground font-medium">{votes} votes</p>
      </div>
    </>
  );
}

export default PollItem;
