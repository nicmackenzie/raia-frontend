import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import { EmojiPicker } from '../../components/ui/EmojiPicker';
import { Textarea } from '../../components/ui/TextArea';
import { cn } from '../../lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFeed } from '../../services/feeds-api';

function PostForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { content: '' },
  });

  const queryClient = useQueryClient();

  const { isLoading, mutate: create } = useMutation({
    mutationFn: createFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      reset();
    },
  });

  function onSubmit(values) {
    create(values);
  }

  const handleEmojiChange = emoji => {
    const currentContent = getValues('content');
    setValue('content', `${currentContent} ${emoji}`);
  };

  return (
    <form
      className="max-w-lg border-b py-2 space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative">
        <Textarea
          className={cn('focus-visible:ring-0 focus-visible:ring-offset-0', {
            'border-destructive': errors?.content,
          })}
          placeholder="Engage with us..."
          {...register('content')}
          disabled={isLoading}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-8">
          <EmojiPicker
            onChange={handleEmojiChange}
            // onChange={emoji => setMessage(prev => `${prev}${emoji}`)}
          />
        </div>
      </div>
      <Button type="submit" size="sm" disabled={isLoading}>
        Post
      </Button>
    </form>
  );
}

export default PostForm;
