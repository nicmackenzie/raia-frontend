import { useCallback } from 'react';
import { createContext, useContext, useState } from 'react';

const MessageContext = createContext({
  currentConversation: [],
  onConversationSelect: () => {},
});

export function MessageProvider({ children }) {
  const [currentConversation, setCurrentConversation] = useState();

  const onConversationSelect = useCallback(conversation => {
    setCurrentConversation(conversation);
  }, []);

  return (
    <MessageContext.Provider
      value={{ currentConversation, onConversationSelect }}
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
