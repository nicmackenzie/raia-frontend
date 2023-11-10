import { SendHorizonal } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useMutation } from '@tanstack/react-query';
import { createMessage } from '../../services/conversations-api';
import { useRef } from 'react';
import { useUser } from '../authentication/use-user';
import { useMessage } from '../../context/messages-context';
import Alert from '../../components/ui/Alert';
import Loader from '../../components/ui/Loader';
import SingleMessage from './SingleMessage';

function MessageArea({ conversationId }) {
  const inputRef = useRef();
  const { data } = useUser();
  const { isLoading: isFetching, messages, error } = useMessage();
  const { isLoading, mutate: send } = useMutation({
    mutationFn: createMessage,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (
      inputRef.current.value.toString().trim().length === 0 ||
      !conversationId
    )
      return;
    const details = {
      senderId: data?.user?.id,
      message: inputRef.current.value,
      conversationId,
    };

    send(details);
    inputRef.current.value = '';
  }

  return (
    <div className="h-full flex flex-col">
      <div className="overflow-y-auto h-full px-4 py-0.5  gap-4 flex flex-col">
        {!isFetching && error && (
          <Alert
            message="There was a problem fetching messages"
            dismissable={false}
            variant="error"
            className="mt-4"
          />
        )}
        {isFetching && <Loader type="spinner" />}
        {messages?.map(message => (
          <SingleMessage
            key={message.id}
            isMine={message.sender_id === data?.user?.id}
            message={message.content}
            date={message.created_at}
          />
        ))}
      </div>
      <form
        className="h-16 bg-background border-t mt-auto py-2 px-4 flex items-center gap-1 relative"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Type your message here..."
          className="grow pr-12"
          ref={inputRef}
          disabled={isLoading}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4"
          disabled={isLoading}
          type="submit"
        >
          <SendHorizonal className="text-tertiary" aria-hidden />
        </Button>
      </form>
    </div>
  );
}

export default MessageArea;
