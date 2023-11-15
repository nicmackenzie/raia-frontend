import { useState } from 'react';
import { addMinutes } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import FormControl from '../../components/ui/FormControl';
import { Textarea } from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useMoveBack } from '../../hooks/use-move-back';
// import { DevTool } from '@hookform/devtools';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { createDiscussion } from '../../services/discussions-api';
import { createDateTime, notificationInitialState } from '../../lib/utils';

// eslint-disable-next-line react-refresh/only-export-components
export const topicOptions = [
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
];

function CreateDiscussionForm() {
  const [notification, setNotification] = useState(notificationInitialState);
  const goBack = useMoveBack();

  const handleReset = () => setNotification(notificationInitialState);

  const { isLoading: isUploading, mutate: upload } = useMutation({
    mutationFn: createDiscussion,
    onSuccess: () => {
      setNotification({
        displayed: true,
        message: 'Baraza created successfully',
        variant: 'success',
      });
      reset();
    },
    onError: error => {
      setNotification({
        displayed: true,
        message: error.message,
        variant: 'error',
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topic: '',
      title: '',
      content: '',
      file: '',
      date: '',
      time: '',
      duration: '',
    },
  });

  const onsubmit = values => {
    const datetime = createDateTime(values.date, values.time);
    const endDatetime = addMinutes(datetime, values.duration);
    const formValues = { ...values, date: datetime, end_datetime: endDatetime };
    delete formValues.time;
    upload(formValues);
  };

  return (
    <div className="p-4">
      <Button
        size="sm"
        variant="ghost"
        className="text-xs transition-all hover:text-primary"
        onClick={goBack}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>&nbsp;Back</span>
      </Button>
      {notification.displayed && (
        <Alert
          message={notification.message}
          variant={notification.variant}
          className="max-w-2xl mb-4"
          onClose={handleReset}
        />
      )}
      <Card className="max-w-2xl mx-4 md:mx-auto mt-2">
        <CardHeader>
          <CardTitle>Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 relative"
            onSubmit={handleSubmit(onsubmit)}
          >
            <FormControl
              label="Topic"
              id="topic"
              className="col-span-12 lg:col-span-6"
              error={errors?.topic?.message}
            >
              <Select
                variant={errors?.topic ? 'destructive' : 'outline'}
                id="topic"
                options={topicOptions}
                size="default"
                placeholder="Select Topic"
                disabled={isUploading}
                {...register('topic', {
                  required: { value: true, message: 'Please select a topic' },
                })}
              />
            </FormControl>
            <FormControl
              label="Title"
              id="discussionTitle"
              className="col-span-12 lg:col-span-6"
              error={errors?.title?.message}
            >
              <Input
                variant={errors?.title ? 'destructive' : 'outline'}
                id="discussionTitle"
                disabled={isUploading}
                options={topicOptions}
                size="default"
                placeholder="Title"
                {...register('title', {
                  required: { value: true, message: 'Title is required' },
                })}
              />
            </FormControl>
            <FormControl
              label="Description"
              id="discussionDescription"
              className="col-span-12"
              error={errors?.content?.message}
            >
              <Textarea
                id="discussionDescription"
                disabled={isUploading}
                placeholder="Your Discussion Description here"
                className={errors?.content ? 'border-red-400' : ''}
                {...register('content', {
                  required: { value: true, message: 'Description is required' },
                })}
              />
            </FormControl>
            <FormControl
              label="Resources"
              id="resources"
              className="col-span-12"
            >
              <Input
                id="resources"
                disabled={isUploading}
                // variant={errors?.file ? 'destructive' : 'default'}
                type="file"
                {...register('file')}
              />
              <span className="block text-xs text-muted-foreground">
                PNG, JPG or PDF (MAX. 2MB)
              </span>
            </FormControl>

            <FormControl
              label="Date"
              id="date"
              className="col-span-12 lg:col-span-6"
              error={errors?.date?.message}
            >
              <Input
                variant={errors?.date ? 'destructive' : 'outline'}
                disabled={isUploading}
                id="date"
                size="default"
                type="date"
                {...register('date', {
                  required: { value: true, message: 'date is required' },
                })}
              />
            </FormControl>
            <FormControl
              label="Time"
              id="time"
              className="col-span-12 lg:col-span-3"
              error={errors?.time?.message}
            >
              <Input
                variant={errors?.time ? 'destructive' : 'outline'}
                disabled={isUploading}
                id="time"
                size="default"
                type="time"
                {...register('time', {
                  required: { value: true, message: 'time is required' },
                })}
              />
            </FormControl>
            <FormControl
              label="Duration(Mins)"
              id="duration"
              className="col-span-12 lg:col-span-3"
              error={errors?.duration?.message}
            >
              <Input
                variant={errors?.duration ? 'destructive' : 'outline'}
                disabled={isUploading}
                id="duration"
                placeholder="eg 40"
                size="default"
                type="number"
                {...register('duration', {
                  required: { value: true, message: 'duration is required' },
                })}
              />
            </FormControl>
            <Button
              className="col-span-12 md:col-span-4"
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? (
                <ButtonLoadingText loadingText="Posting..." />
              ) : (
                'Create Discussion'
              )}
            </Button>
          </form>
          {/* <DevTool control={control} /> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateDiscussionForm;
