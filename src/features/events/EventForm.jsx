import { useEffect, useState } from 'react';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import { Textarea } from '../../components/ui/TextArea';
import TimePicker from '../../components/ui/TimePicker';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createEvent } from '../../services/events-api';
import { useUser } from '../authentication/use-user';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { format } from 'date-fns';

function EventForm() {
  const [error, setError] = useState();
  const [eventTime, seteventTime] = useState();
  const {
    data: { user },
  } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
    },
  });

  useEffect(
    function () {
      setValue('time', eventTime);
    },
    [eventTime, setValue]
  );

  const { isLoading, mutate: create } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      reset();
    },
    onError: error => {
      setError(error.message);
    },
  });

  function onSubmit(values) {
    const formData = {
      ...values,
      user_id: user.id,
      county_id: user.county_id,
      date: format(new Date(values.date), 'yyyy-MM-dd'),
    };
    create(formData);
  }

  return (
    <>
      {error && (
        <Alert
          message={error}
          onClose={setError}
          className="w-full"
          variant="error"
        />
      )}
      <form
        className="grid grid-cols-12 gap-x-2 gap-y-4 px-4 max-w-lg mx-4 md:mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          label="Event Name"
          className="col-span-12"
          error={errors?.name?.message}
        >
          <Input
            placeholder="Event name"
            id="name"
            variant={errors?.name ? 'destructive' : 'default'}
            {...register('name', { required: 'Field is required' })}
            disabled={isLoading}
          />
        </FormControl>
        <FormControl
          label="Event Date"
          id="date"
          className="col-span-12 sm:col-span-8"
          error={errors?.date?.message}
        >
          <Input
            type="date"
            id="date"
            variant={errors?.date ? 'destructive' : 'default'}
            {...register('date', { required: 'Field is required' })}
            disabled={isLoading}
          />
        </FormControl>
        <FormControl
          label="Event Time"
          id="time"
          className="col-span-12 sm:col-span-4"
          error={errors?.time?.message}
        >
          <TimePicker
            id="time"
            {...register('time', { required: 'Field is required' })}
            variant={errors?.date ? 'destructive' : 'default'}
            onTimeSet={seteventTime}
            disabled={isLoading}
          />
        </FormControl>
        <FormControl
          label="Location"
          id="location"
          className="col-span-12"
          error={errors?.location?.message}
        >
          <Input
            placeholder="provide location"
            id="location"
            variant={errors?.location ? 'destructive' : 'default'}
            {...register('location', { required: 'Field is required' })}
            disabled={isLoading}
          />
        </FormControl>
        <FormControl
          label="Description"
          id="description"
          className="col-span-12"
          error={errors?.description?.message}
        >
          <Textarea
            className={errors?.description ? 'border-destructive' : ''}
            {...register('description', { required: 'Field is required' })}
            disabled={isLoading}
          />
        </FormControl>
        <Button
          type="submit"
          className="col-span-12 md:col-span-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <ButtonLoadingText loadingText="Creating event..." />
          ) : (
            'Save'
          )}
        </Button>

        <Button
          type="button"
          className="col-span-12 md:col-span-3"
          variant="outline"
          disabled={isLoading}
          onClick={() => reset()}
        >
          Reset
        </Button>
      </form>
    </>
  );
}

export default EventForm;
