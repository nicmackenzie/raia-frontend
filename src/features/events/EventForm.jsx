import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
// import { Textarea } from '../../components/ui/TextArea';
import TimePicker from '../../components/ui/TimePicker';
import { createEvent } from '../../services/events-api';
import { useUser } from '../authentication/use-user';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

function EventForm() {
  const [error, setError] = useState();
  const [description, setDescription] = useState('');
  const [eventTime, seteventTime] = useState();
  const { user } = useUser();

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
      poster: '',
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
      setDescription('');
    },
    onError: error => {
      setError(error.message);
    },
  });

  function onSubmit(values) {
    if (!description || description === '') {
      toast.error('Enter event description');
      return;
    }
    const formData = {
      ...values,
      user_id: user?.id,
      county_id: user?.county_id,
      date: format(new Date(values.date), 'yyyy-MM-dd'),
      description,
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
        className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mx-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-x-2 gap-y-4 max-w-lg">
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
              resetValue={eventTime}
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
          <div className="col-span-12">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6"
            >
              Poster <span className="text-xs italic">(Optional)</span>
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-4">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      {...register('poster')}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <FormControl
            label="Description"
            id="description"
            className="col-span-12"
            error={errors?.description?.message}
          >
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="lg:h-44"
            />

            {/* <Textarea
              className={errors?.description ? 'border-destructive' : ''}
              {...register('description', { required: 'Field is required' })}
              disabled={isLoading}
            /> */}
          </FormControl>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-4 mt-4">
          <Button type="submit" className="w-full lg:w-44" disabled={isLoading}>
            {isLoading ? (
              <ButtonLoadingText loadingText="Creating event..." />
            ) : (
              'Save'
            )}
          </Button>

          <Button
            type="button"
            className="w-full lg:w-44"
            variant="outline"
            disabled={isLoading}
            onClick={() => reset()}
          >
            Reset
          </Button>
        </div>
      </form>
    </>
  );
}

export default EventForm;
