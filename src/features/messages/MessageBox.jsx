import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMessage } from '../../context/messages-context';
import { cn } from '../../lib/utils';
import MessageArea from './MessageArea';
import { useUser } from '../authentication/use-user';
import { getConversations } from '../../services/conversations-api';
import { useState } from 'react';
import Conversation from './Conversation';
// import { pusher } from '../../lib/pusher';
// import Pusher from 'pusher-js';

function MessageBox() {
  const { currentConversation } = useMessage();
  const [conversations, setConversations] = useState([]);

  const {
    data: { user },
  } = useUser();
  const { isLoading, data, error } = useQuery({
    queryFn: () => getConversations(user?.id),
    queryKey: ['messages', user?.id],
  });

  useEffect(
    function () {
      if (Array.isArray(data)) {
        setConversations(data);
      }
    },
    [data]
  );

  // useEffect(
  //   function () {
  //     // console.log(currentConversation);
  //     const pusher = new Pusher('b49dba2e217b5f7d267c', {
  //       cluster: 'ap2',
  //     });

  //     const channel = pusher.subscribe('currentConversation');
  //     channel.bind('message:new', data => {
  //       alert(JSON.stringify(data));
  //     });

  //     return () => {
  //       channel.unsubscribe(currentConversation);
  //       channel.unbind('message:new', () => {});
  //     };
  //   },
  //   [currentConversation]
  // );

  return (
    <div className="flex">
      <div className="h-[calc(100dvh-4rem)] md:inline-flex flex-col overflow-y-auto md:fixed w-full md:w-72 lg:w-96 border-r">
        {conversations?.length > 0 &&
          conversations.map(conversation => (
            <Conversation
              key={conversation.id}
              lastMessage={conversation.last_message}
              otherUserId={
                conversation.user_1.id === user?.id
                  ? conversation.user_2
                  : conversation.user_1
              }
            />
          ))}
      </div>
      <div
        className={cn(
          'hidden md:flex flex-col md:grow h-[calc(100dvh-4rem)]',
          !currentConversation && 'items-center justify-center'
        )}
      >
        {!currentConversation ? (
          <p className="text-muted-foreground text-lg">
            Select a conversation to start
          </p>
        ) : (
          <MessageArea conversationId={currentConversation} />
        )}
      </div>
    </div>
  );
}

export default MessageBox;
