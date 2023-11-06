import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

import Button, { BackButton } from '../../components/ui/Button';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import { createPoll } from '../../services/polls-api';

const uid = function () {
  return crypto.randomUUID();
};

function validateOptions(array) {
  let count = 0;
  array.forEach(arr => {
    if (arr.value === '') {
      count++;
    }
  });

  return { hasIncomplete: count > 0, count };
}

function PollForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { question: '', end_date: '' } });

  const [options, setOptions] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: create } = useMutation({
    mutationFn: createPoll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polls'] });
      navigate('/polls-surveys');
    },
    onError: error => {
      setError(error.message);
    },
  });

  function handleAddOption() {
    setError();
    setOptions(prev => [...prev, { id: uid(), value: '' }]);
  }

  function onSubmit(values) {
    setError();
    if (!options || options.length === 0) {
      setError('No options set for the poll');
      return;
    }
    if (validateOptions(options).hasIncomplete) {
      setError(
        `${validateOptions(options).count} option(s) has no value provided`
      );
      return;
    }
    const formObj = {
      question: values.question,
      end_date: values.end_date,
      poll_options: options.map(option => option.value),
    };
    create(formObj);
  }

  function handleChange(e, id) {
    setOptions(prev => {
      const clonedArr = prev.slice();
      const indexOf = clonedArr.findIndex(val => val.id === id);
      clonedArr.at(indexOf).value = e.target.value;
      return clonedArr;
    });
  }

  function handleRemove(id) {
    setOptions(prev => prev.filter(opt => opt.id !== id));
  }

  return (
    <div className="m-4 space-y-4">
      {!isLoading && <BackButton />}

      {error && (
        <Alert
          message={error}
          variant="error"
          dismissable
          onClose={setError}
          className="max-w-lg"
        />
      )}
      <form
        className="max-w-lg p-4 rounded-md border md:mx-auto space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-base md:text-lg font-semibold text-center">
          Create a poll
        </h2>
        <FormControl
          error={errors?.question?.message}
          label="Question"
          id="question"
        >
          <Input
            id="question"
            variant={errors?.question ? 'destructive' : 'default'}
            {...register('question', { required: 'Question is required' })}
            placeholder="Enter your question here..."
            disabled={isLoading}
          />
        </FormControl>
        <FormControl
          error={errors?.end_date?.message}
          label="Close On"
          id="end_date"
        >
          <Input
            id="end_date"
            type="date"
            disabled={isLoading}
            variant={errors?.end_date ? 'destructive' : 'default'}
            {...register('end_date', {
              required: 'Closing Date for poll is required',
            })}
          />
        </FormControl>
        <Button
          variant="secondary"
          className="w-full text-xs flex items-center gap-4 font-semibold"
          size="sm"
          onClick={handleAddOption}
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" /> <span>Add Option</span>
        </Button>
        <div className="space-y-2">
          {options.length > 0 &&
            options.map(option => (
              <div key={option.id} className="flex items-center gap-1">
                <Input
                  onChange={e => handleChange(e, option.id)}
                  className="grow"
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isLoading}
                  onClick={() => handleRemove(option.id)}
                >
                  <Trash className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <ButtonLoadingText loadingText="Creating..." />
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </div>
  );
}

export default PollForm;
