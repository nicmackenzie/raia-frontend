import { Link } from 'react-router-dom';
import Avatar from '../../components/ui/Avatar';
import { cn, formatDateDistance } from '../../lib/utils';
import { useMutation } from '@tanstack/react-query';
import {
  readNotification,
  deleteNotification,
} from '../../services/notification-api';
import toast from 'react-hot-toast';

function Notification({
  unread,
  imageUrl,
  username,
  notification,
  redirectUrl,
  createdAt,
  onDelete,
  id,
}) {
  const { mutate } = useMutation({
    mutationFn: readNotification,
  });

  const { mutate: deleteNotApi } = useMutation({
    mutationFn: deleteNotification,
  });

  function handleReadNotification() {
    mutate(id);
  }

  function handleDelete(e) {
    e.stopPropagation();
    deleteNotApi(id, {
      onSuccess: () => {
        onDelete(id);
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  }

  return (
    <Link
      to={redirectUrl}
      className={cn(
        'flex gap-2 items-center px-4 py-2 rounded-md',
        unread ? 'bg-primary/10 border-l-4 border-primary' : ''
      )}
      onClick={handleReadNotification}
    >
      <Avatar src={imageUrl} alt={`Avatar for ${username}`} />
      <div className="w-full">
        <p className="text-sm font-medium">{notification}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDateDistance(createdAt)}
          </span>
          <button
            className="text-destructive text-xs font-medium transition-colors hover:text-destructive/80"
            onClick={e => handleDelete(e)}
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Notification;
