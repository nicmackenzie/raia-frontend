import { format } from 'timeago.js';
import { useForm } from 'react-hook-form';

import Avatar from '../../components/ui/Avatar';
import Input from '../../components/ui/Input';

import defaultUser from '../../assets/default-user.jpg';
import { EmojiPicker } from '../../components/ui/EmojiPicker';
import Button from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';

function Feed({ content, created_at, author }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({ defaultValues: { comment: '' } });

  function handleEmojiChange(emoji) {
    const content = getValues('comment');
    setValue('comment', `${content}${emoji}`);
  }

  function onSubmit(comment) {
    console.log(comment);
  }

  return (
    <article className="space-y-4 rounded px-2 py-1 border shadow-md max-w-xl">
      <header className="flex items-center gap-4">
        <Avatar
          src={author?.profile_image || defaultUser}
          alt={`${author?.full_name} avatar`}
          size="sm"
        />
        <div>
          <p className="text-tertiary text-sm">{author?.full_name}</p>
          <p className="text-xs text-muted-foreground">
            {created_at && format(created_at)}
          </p>
        </div>
      </header>
      <p className="text-xs">{content}</p>

      <div>{/* <Avatar src={} /> */}</div>

      <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex-1">
          <Input
            placeholder="Join the conversation.."
            size="small"
            className="pr-12"
            {...register('comment', { required: true })}
          />
          <div className="absolute top-1 right-2">
            <EmojiPicker onChange={handleEmojiChange} />
          </div>
        </div>
        <Button size="small" className="px-1">
          Post
        </Button>
      </form>
    </article>
  );
}

Feed.Skeleton = function SkeletonBoardList() {
  return (
    <div className="space-y-4 rounded px-2 py-1 border shadow-md max-w-xl">
      <div className="flex items-center gap-4">
        <Skeleton className="rounded-full h-10 w-10" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      <Skeleton className="h-24" />
    </div>
  );
};

export default Feed;
