import { useNotifications } from '../../context/notifications-context';
import { NotificationCount } from '../../components/layout/LeaderNavBar';
import Button from '../../components/ui/Button';
import Notification from './Notification';
import { useState } from 'react';
function NotificationsBox() {
  const { notifications, unread } = useNotifications();
  const [optimisticNotifications, setOptimisticNotifications] =
    useState(notifications);

  function removeNotification(id) {
    setOptimisticNotifications(prev => prev.status !== id);
  }
  return (
    <div className="max-w-2xl mx-4 md:mx-auto space-y-4 border rounded-md p-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg lg:text-2xl font-bold">Notifications</h1>
          {unread > 0 && (
            <NotificationCount
              count={unread}
              className="w-6 h-6 text-xs font-semibold"
            />
          )}
        </div>
        {unread > 0 && (
          <Button size="sm" variant="ghost" className="text-primary font-bold">
            Mark all as read
          </Button>
        )}
      </header>
      <div className="space-y-4">
        {optimisticNotifications.length > 0 ? (
          optimisticNotifications.map(notification => (
            <Notification
              key={notification.id}
              createdAt={notification.created_at}
              imageUrl={notification.user_from.profile_image}
              username={notification.user_from.full_name}
              notification={notification.message}
              unread={notification.status === 'unread]'}
              redirectUrl={notification.redirect_url}
              id={notification.id}
              onDelete={removeNotification}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-center">
            You don&apos;t have any notifications
          </p>
        )}
      </div>
    </div>
  );
}

export default NotificationsBox;
