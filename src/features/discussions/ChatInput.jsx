import { useState } from 'react';
import { Plus } from 'lucide-react';
import Input from '../../components/ui/Input';
import { EmojiPicker } from '../../components/ui/EmojiPicker';

import { useMutation } from '@tanstack/react-query';
import { chat } from '../../services/discussions-api';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function ChatInput() {
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const { isLoading, mutate: send } = useMutation({
    mutationFn: chat,
    onSuccess: () => setMessage(''),
    onError: error => {
      toast.error(error.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (message.trim().length === '') return;
    send({ message, id });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative p-4 pb-6">
        <button
          type="button"
          disabled={isLoading}
          className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
        >
          <Plus className="text-white dark:text-[#313338]" />
        </button>
        <Input
          className="px-14 py-6  focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Engage with us..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <div className="absolute top-7 right-8">
          <EmojiPicker
            // onChange={(emoji) => field.onChange(`${field.value} ${emoji}`)}
            onChange={emoji => setMessage(prev => `${prev}${emoji}`)}
          />
        </div>
      </div>
    </form>
  );
}

export default ChatInput;
