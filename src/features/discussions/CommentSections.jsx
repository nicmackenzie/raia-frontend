import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import { Textarea } from '../../components/ui/TextArea';
import { numberFormatter } from '../../lib/utils';
import CommentItem from './CommentItem';
import FormControl from '../../components/ui/FormControl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../../services/discussions-api';
import { useState } from 'react';
import Alert from '../../components/ui/Alert';
import { useParams } from 'react-router-dom';

function CommentSections({ comments }) {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [error, setError] = useState();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { comment: '' },
  });

  const { isLoading, mutate: create } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['barazas'] });
    },
    onError: err => {
      setError(err.message);
    },
  });

  function onSubmit(values) {
    create({ content: values.comment, id });
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm font-bold uppercase">
        {comments?.length === 0
          ? 'No comments yet!'
          : `comments (${numberFormatter(comments.length)})`}
      </p>
      {error && (
        <Alert
          message={error.message}
          variant="error"
          dismissable
          onClose={setError}
        />
      )}
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="comment" error={errors?.comment?.message}>
          <Textarea
            {...register('comment', { required: 'Enter a comment' })}
            placeholder="Give us your view"
            id="comment"
            className={errors?.comment ? 'border-destructive' : ''}
            disabled={isLoading}
          />
        </FormControl>
        <Button
          size="sm"
          className="w-full md:w-max"
          type="submit"
          disabled={isLoading}
        >
          Comment
        </Button>
      </form>
      <div className="space-y-4 ">
        {comments?.length === 0 ? (
          <p className="text-lg md:text-xl font-semibold text-center text-muted-foreground">
            Be the first to comment!!😀
          </p>
        ) : (
          comments.map(comment => <CommentItem key={comment.id} {...comment} />)
        )}
      </div>
    </div>
  );
}

export default CommentSections;
