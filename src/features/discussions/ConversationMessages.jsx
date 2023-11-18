import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import Avatar from '../../components/ui/Avatar';
import Alert from '../../components/ui/Alert';

import defaultImage from '../../assets/default-user.jpg';
import { cn, socket } from '../../lib/utils';
import { useUser } from '../../features/authentication/use-user';
import { getChats } from '../../services/discussions-api';
import { find } from 'lodash';

function ConversationMessages() {
  const { id } = useParams();
  const { data: user } = useUser();
  const [chats, setChats] = useState([]);
  const scrollRef = useRef();

  const { isLoading, data, error } = useQuery({
    queryFn: () => getChats(id),
    queryKey: ['barazas', id, 'chats'],
  });

  useEffect(
    function () {
      if (data) {
        setChats(data?.data);
      }
    },
    [data]
  );

  useEffect(() => {
    const handleChat = data => {
      setChats(prev => {
        if (find(prev, { id: data.id })) return prev;

        return [...prev, data];
      });
    };

    socket.on(`chat:${id}`, handleChat);

    // Cleanup function
    return () => {
      socket.off(`chat:${id}`, handleChat);
    };
  }, [id]);

  // useEffect(
  //   function () {
  //     socket.on(`chat:${id}`, data => {
  //       setChats(prev => {
  //         if (find(prev, { id: data.id })) return prev;

  //         return [...prev, data];
  //       });
  //     });
  //   },
  //   [id]
  // );

  useEffect(
    function () {
      scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [chats]
  );

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-muted-foreground text-sm">Loading messages</p>
      </div>
    );
  }

  if (error)
    return (
      <Alert
        message={error.message}
        dismissable={false}
        variant="error"
        className="mt-6"
      />
    );

  return (
    <div className="flex-1 flex flex-col gap-6 py-4 overflow-y-auto px-8">
      {chats &&
        chats.length > 0 &&
        chats.map(chat => (
          <div className="flex gap-4" key={chat.id} ref={scrollRef}>
            <Avatar
              src={chat.user.profile_image || defaultImage}
              alt={`Avatar for ${chat.user.full_name}`}
              className="w-6 h-6"
            />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center text-sm gap-6">
                <p
                  className={cn(
                    'font-semibold text-sm',
                    user?.user?.id === chat.user.id && 'text-primary font-bold'
                  )}
                >
                  {chat.user.full_name}
                </p>
                {/* <span className="text-xs text-muted-foreground">
                  {format(new Date(chat.created_at), 'dd MMMM yyyy HH:mm')}
                </span> */}
              </div>
              <p className="text-xs">{chat.message}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ConversationMessages;
