import Avatar from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { ChevronsUp, MessageSquare } from 'lucide-react';

function DiscussionCard({ title, id, created_by }) {
  return (
    <div className="bg-background rounded-lg shadow-md py-2 px-4 space-y-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Avatar
            src="https://i.pravatar.cc/48?u=9i9q21eqe"
            alt="avatar for user"
          />
          <div>
            <div className="text-sm font-semibold">{created_by}</div>
            <p className="text-xs text-muted-foreground">2 days ago</p>
          </div>
        </div>
        <Badge size="sm">Education</Badge>
      </header>
      <div className="space-y-1.5">
        <Link to={id}>
          <h3 className="text-base lg:text-lg font-semibold transition-colors hover:text-primary">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          obcaecati facere repudiandae quidem, doloribus minima aliquam fugit
          dolorum id voluptatem! Reiciendis debitis...{' '}
          <Link to={id}>
            <span className="font-semibold text-primary">Read More</span>
          </Link>
        </p>
      </div>
      <footer className="flex items-center gap-4">
        <div className="flex gap-1 items-center">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground text-xs font-medium">
            12k replies
          </span>
        </div>
        <div className="flex gap-0.5 items-center">
          <ChevronsUp className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground text-xs font-medium">
            12k upvotes
          </span>
        </div>
      </footer>
    </div>
  );
}

export default DiscussionCard;
