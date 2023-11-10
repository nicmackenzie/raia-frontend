import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { createContext, useContext, useState } from 'react';
import { getMessages } from '../services/conversations-api';

const MessageContext = createContext({
  currentConversation: [],
  onConversationSelect: () => {},
  messages: [],
  isLoading: false,
  error: {},
});

export function MessageProvider({ children }) {
  const [currentConversation, setCurrentConversation] = useState();

  const {
    isLoading,
    data: messages,
    error,
  } = useQuery({
    queryFn: () => getMessages(currentConversation),
    queryKey: ['messages', currentConversation],
  });

  const onConversationSelect = useCallback(conversation => {
    setCurrentConversation(conversation);
  }, []);

  return (
    <MessageContext.Provider
      value={{
        currentConversation,
        onConversationSelect,
        isLoading,
        messages,
        error,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMessage() {
  const context = useContext(MessageContext);
  if (context == undefined)
    throw new Error('Trying to access Message Context outside its provider');
  return context;
}
