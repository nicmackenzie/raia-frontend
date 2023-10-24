import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import FormControl from '../../components/ui/FormControl';
import { Textarea } from '../../components/ui/TextArea';
import { useMutation } from '@tanstack/react-query';
import { postEnquiry } from '../../services/events-api';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { useState } from 'react';
import Alert from '../../components/ui/Alert';

const initialNotificationState = {
  variant: 'error',
  message: '',
  display: false,
};
function EventEnquiryForm({ user_from, event, event_user }) {
  const [notification, setNotification] = useState(initialNotificationState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { enquiry: '' },
  });

  const { isLoading, mutate: enquire } = useMutation({
    mutationFn: postEnquiry,
    onSuccess: () => {
      reset();
      setNotification(prev => ({
        ...prev,
        message:
          'Submitted successfully. You will be notified if a response is given',
        display: true,
        variant: 'success',
      }));
    },
    onError: err => {
      setNotification(prev => ({
        ...prev,
        message: err.message,
        display: true,
        variant: 'error',
      }));
    },
  });

  function onClear() {
    setNotification(initialNotificationState);
  }

  function onSubmit(value) {
    const details = {
      message: value.enquiry,
      user_id: user_from,
      user_to_id: event_user,
    };

    enquire({ details, id: event });
  }
  return (
    <>
      {notification.display && (
        <Alert
          message={notification.message}
          variant={notification.variant}
          onClose={onClear}
        />
      )}
      <h3 className="text-primary">
        Need more information on this event? Write to us
      </h3>
      <form
        className="max-w-lg mt-2 space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl error={errors?.enquiry?.message}>
          <Textarea
            className={errors?.enquiry ? 'border-destructive' : ''}
            placeholder="Any questions or feedback on this event?"
            disabled={isLoading}
            {...register('enquiry', {
              required: 'This field is required',
              minLength: {
                value: 20,
                message: 'Message needs to be over 20 characters',
              },
            })}
          />
        </FormControl>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <ButtonLoadingText loadingText="Sending..." />
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </>
  );
}

export default EventEnquiryForm;
