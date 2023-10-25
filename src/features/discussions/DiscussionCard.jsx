import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription,CardContent, CardFooter } from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
// import discussions from './discussionData'
import { useUser } from '../authentication/use-user'
import { useNavigate, Link } from 'react-router-dom'
import { getDiscussions } from '../../services/discussions-api'
import { useQuery } from '@tanstack/react-query'
import { Badge } from '../../components/ui/Badge'
import { ChevronsUp, MessageSquare } from 'lucide-react'
import timeElapsed from './dateTime'

function DiscussionCard({title, id, user, discussion_replies, created_at, content}) {
  const navigate = useNavigate();
  // const { isLoading: isFetching, data: user } = useUser();
  // const role = user?.user.role.toLowerCase();

  // if (isFetching){return null}
  // console.log(role)
 

  // const { isLoading, data } = useQuery({
  //   queryFn: () => getDiscussions(),
  //   queryKey: ['discussions'],
  // });

  // if (isLoading){return null};

  // console.log(data);


  

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
            <p className="text-xs text-muted-foreground">{timeElapsed(created_at)}</p>
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
