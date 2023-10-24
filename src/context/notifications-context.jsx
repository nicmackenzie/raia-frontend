import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState, useEffect } from 'react';
import { getNotifications } from '../services/notification-api';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const {
    isLoading: isLoadingNotifications,
    data,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: 10000,
  });

  useEffect(
    function () {
      if (data) {
        setNotifications(data);
      }
    },

    [data]
  );

  const count = notifications.filter(
    notification => notification.status === 'unread]'
  ).length;

  return (
    <NotificationContext.Provider
      value={{ isLoadingNotifications, notifications, error, unread: count }}
    >
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
