import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../components/ui/Button';
import { pollVote } from '../../services/polls-api';
import { useState } from 'react';
import Alert from '../../components/ui/Alert';

function PollContent({ question, options, pollId, onClose, hasVoted }) {
  const [error, setError] = useState();
  const queryClient = useQueryClient();

  const { isLoading, mutate: vote } = useMutation({
    mutationFn: pollVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polls'] });
      onClose();
    },
    onError: error => {
      setError(error.message);
    },
  });

  function handleVote(optionId) {
    vote({ optionId, pollId });
  }

  return (
    <div className="space-y-3">
      {error && <Alert message={error} variant="error" onClose={setError} />}
      {!hasVoted ? (
        <>
          {' '}
          <p className="text-sm text-tertiary">{question}</p>
          <div className="flex flex-col gap-2">
            {options.map(option => (
              <Button
                variant="outline"
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={isLoading}
              >
                {option.option}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <p>You have already participated in this poll.</p>
      )}
    </div>
  );
}

export default PollContent;
