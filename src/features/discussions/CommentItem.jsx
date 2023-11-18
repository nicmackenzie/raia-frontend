import { format } from 'timeago.js';
import Avatar from '../../components/ui/Avatar';
import defaultAvatar from '../../assets/default-user.jpg';

function CommentItem({ content, created_at, user }) {
  return (
    <div className="grid grid-cols-comment gap-x-4 gap-y-2 items-center pb-4 border-b">
      <Avatar
        src={user?.profile_image || defaultAvatar}
        alt="Avatar for user"
      />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-tertiary">
            {user?.full_name}
          </div>
          <span className="text-xs text-muted-foreground -mt-2">
            @{user?.username}
          </span>
        </div>
        <span className="inline-flex text-xs text-muted-foreground">
          {format(new Date(created_at))}
        </span>
      </div>
      <p className="col-start-2 text-sm leading-6 text-muted-foreground">
        {content}
      </p>
    </div>
  );
}

export default CommentItem;
