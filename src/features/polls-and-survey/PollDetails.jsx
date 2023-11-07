import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Loader from '../../components/ui/Loader';
import { getPoll } from '../../services/polls-api';
import { BackButton } from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { formatDate } from '../../lib/utils';

function PollDetails() {
  const { id } = useParams();

  const [pollDetails, setPollDetails] = useState({});
  const { isLoading, error, data } = useQuery({
    queryFn: () => getPoll(id),
    queryKey: ['polls', id],
  });

  useEffect(
    function () {
      if (data) {
        setPollDetails(data);
      }
    },
    [id, data]
  );

  if (isLoading) return <Loader type="spinner" size="md" />;
  const { question, count, created_at, end_date, results, options } =
    pollDetails;
  const optionsWithVotes = options?.map(option => {
    const foundResult = results?.find(result => result.id === option.id);
    const result = !foundResult ? 0 : foundResult.vote_count;

    const percentage =
      (isNaN(Math.round(+result / +count)) ? 0 : Math.round(+result / +count)) *
        100 +
      '%';
    return {
      id: option.id,
      option: option.option,
      votes: result,
      percentage,
    };
  });

  if (error)
    return (
      <Alert
        message={error.message}
        dismissable={false}
        variant="error"
        className="m-4"
      />
    );

  return (
    <div className="m-4">
      <BackButton />

      <article className="max-w-xl mx-auto space-y-4">
        <header className="space-y-2">
          <h1 className="text-xl md:text-2xl text-tertiary font-semibold ">
            {question}
          </h1>
          <div className="flex flex-col gap-2 text-muted-foreground text-xs font-medium">
            <div>
              Ran from{' '}
              <span>
                {created_at && formatDate(new Date(created_at), false)}
              </span>{' '}
              to{' '}
              <span>{end_date && formatDate(new Date(end_date), false)}</span>
            </div>
            <div className="text-primary text-sm">{count} Votes</div>
          </div>
        </header>
        <div className="space-y-2">
          {optionsWithVotes?.map(option => (
            <div className="rounded-md border h-12 relative" key={option.id}>
              <div
                className="h-full bg-primary/10"
                style={{ width: option.percentage }}
              ></div>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-primary">
                {option.percentage}
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-primary">
                {option.option}
              </span>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

export default PollDetails;
