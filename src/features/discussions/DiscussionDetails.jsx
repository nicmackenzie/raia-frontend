import { cn, formatDateDistance } from '../../lib/utils';
import Button from '../../components/ui/Button';
import { ChevronUp, Clock, User } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

function DiscussionDetails({ discussionDetails, isLive, setIsLive }) {
  let isPosting = false;

  return (
    <div
      className={cn(
        'rounded-md shadow-md max-w-xl bg-secondary mx-auto flex gap-4 items-center py-2 px-4'
      )}
    >
      <Button
        variant="outline"
        size="md"
        className="flex flex-col px-2"
        disabled={isPosting}
      >
        <ChevronUp className="w-4 h-4 text-gold" />
        <span className="inline-flex text-[10px] text-gold font-semibold">
          2
        </span>
      </Button>
      <div className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-tertiary text-base md:text-lg font-bold">
            {discussionDetails?.title}
          </h1>
          <p className="text-xs text-muted-foreground">
            {discussionDetails?.content}
          </p>
          <Badge
            className="bg-primary/10 text-[10px] uppercase text-primary inline-block pointer-events-none"
            size="sm"
          >
            {discussionDetails?.topic}
          </Badge>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:items-center md:gap-4">
          <div className="flex gap-2 md:gap-1 items-center">
            {!isLive ? (
              <>
                <Clock className="w-4 h-4 text-primary/50" />
                <span className="text-xs text-tertiary font-medium">
                  Starting{' '}
                  {discussionDetails?.date &&
                    formatDateDistance(discussionDetails?.date, new Date())}
                </span>
              </>
            ) : (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-green-400 text-xs inline-block">
                  Live
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-1 items-center">
            <User className="w-4 h-4 text-primary/50" />
            <span className="text-xs text-tertiary font-medium">
              Created by {discussionDetails?.user?.full_name}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(prev => !prev)}
          >
            Simulate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DiscussionDetails;
