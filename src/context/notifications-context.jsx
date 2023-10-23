import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { getNotifications } from '../services/notification-api';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const {
    isLoading: isLoadingNotifications,
    data,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: 2000,
  });

  const count =
    data.length > 0
      ? data.filter(notification => notification.status === 'unread').length
      : 0;

  return (
    <NotificationContext.Provider
      value={{ isLoadingNotifications, data, error, unread: count }}
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
