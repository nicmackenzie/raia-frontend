import { createContext, useContext, useState, useEffect } from 'react';
import { socket } from '../lib/utils';
import { useUser } from '../features/authentication/use-user';

const NotificationContext = createContext({
  count: 0,
});

export function NotificationProvider({ children }) {
  const [notificationDetails, setNotificationDetails] = useState({
    count: 0,
    notifications: [],
  });
  const { data } = useUser();

  useEffect(
    function () {
      socket.on(`notification:new:${data?.user?.id}`, data => {
        setNotificationDetails(prev => {
          if (prev.notifications.includes(data.id)) return prev;

          return {
            count: prev.count + 1,
            notifications: [...prev.notifications, data.id],
          };
        });
      });
    },
    [data?.user]
  );

  return (
    <NotificationContext.Provider value={{ count: notificationDetails.count }}>
      {children}
    </NotificationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
}
