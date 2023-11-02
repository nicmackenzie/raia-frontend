import { Image } from 'lucide-react';
import ActionCable from 'actioncable';
import Button from '../../components/ui/Button';
import { ScrollArea } from '../../components/ui/ScrollArea';
import Input from '../../components/ui/Input';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chat, getChats } from '../../services/discussions-api';

function DiscussionChat({ discussionId }) {
  const [chats, setChats] = useState([]);
  const { isLoading, data } = useQuery({
    queryFn: () => getChats(discussionId),
    queryKey: ['discussion-chats', discussionId],
  });

  useEffect(
    function () {
      setChats(data);
    },
    [discussionId, data]
  );
  useEffect(
    function () {
      if (import.meta.env.DEV) Pusher.logToConsole = true;

      const pusher = new Pusher('5e1dde6be020c06a8943', {
        cluster: 'ap2',
      });

      const channel = pusher.subscribe('discussion-channel');
      channel.bind('discussion-chat', function (data) {
        const fetchedChats = JSON.parse(JSON.stringify(data?.chats || []));
        // console.log(data);
        setChats(fetchedChats || []);
      });

      return () => {
        pusher.unsubscribe('discussion-chat');
        pusher.disconnect();
      };
    },
    [discussionId]
  );

  return (
    <>
      <ScrollArea className="h-[450px] rounded-md border max-w-lg mx-auto py-2 px-4 relative">
        <Heading />
        <div className="pt-6">
          {chats?.length > 0 &&
            chats.map(chat => <p key={chat.id}>{chat.message}</p>)}
        </div>
        <Form discussionId={discussionId} />
      </ScrollArea>
    </>
  );
}

function Heading() {
  return (
    <header className="absolute top-0 left-0 pb-2 border-b w-full bg-secondary z-50">
      <h2 className="text-black text-center text-sm font-semibold text-tertiary">
        Discussion chats
      </h2>
    </header>
  );
}

function Form({ discussionId }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { message: '' } });

  const { isLoading, mutate } = useMutation({
    mutationFn: chat,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ['discussion-chats', discussionId],
      });
    },
  });

  function onSubmit({ message }) {
    mutate({ message, id: discussionId });
  }
  return (
    <form
      className="absolute bottom-0 left-0 z-50 w-full flex items-center bg-secondary p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Button variant="ghost" size="icon" className="text-primary/50">
        <Image />
      </Button> */}
      <Input
        className="flex-1"
        disabled={isLoading}
        placeholder="Enter your message here..."
        variant={errors?.message ? 'destructive' : 'default'}
        {...register('message', { required: 'your message' })}
      />
    </form>
  );
}

export default DiscussionChat;
