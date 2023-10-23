import { useNotifications } from '../context/notifications-context';

function Notifications() {
  const { data, unread } = useNotifications();
  console.log(unread);
  return <div></div>;
}

export default Notifications;
