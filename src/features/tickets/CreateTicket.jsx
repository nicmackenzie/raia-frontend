import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import FormControl from '../../components/ui/FormControl';
import Alert from '../../components/ui/Alert';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import Loader from '../../components/ui/Loader';
import { Textarea } from '../../components/ui/TextArea';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button, { BackButton } from '../../components/ui/Button';

import { useUser } from '../authentication/use-user';
import { getLeaders } from '../../services/profile-api';
import { createTicket } from '../../services/tickets-api';

const CATEGORIES = [
  { value: 'governance', label: 'Governance' },
  { value: 'fund-utilization', label: 'Fund Utilization' },
  { value: 'development', label: 'Development' },
  { value: 'community-outreach', label: 'Community Outreach' },
];

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function CreateTicket() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      leader: '',
      category: '',
      priority: 'medium',
    },
  });

  const { isLoading: isCreating, mutate: create } = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      navigate('/tickets');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const { user } = useUser();

  const {
    isLoading,
    data: leaders,
    error,
  } = useQuery({ queryKey: ['leaders'], queryFn: getLeaders });

  if (user && !user.county_id) {
    return (
      <Alert
        message="Update your profile and set your county"
        dismissable={false}
      />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Alert message={error.message} dismissable={false} />;
  }

  if (!leaders || leaders.length === 0) {
    return (
      <Alert
        message="No leaders currently set for your locale"
        dismissable={false}
      />
    );
  }

  const formattedLeaders =
    leaders &&
    leaders.map(leader => ({ value: leader.id, label: leader.full_name }));

  function onSubmit(values) {
    const formObj = {
      ...values,
      assignedLeaderId: values.leader,
    };

    create(formObj);
  }

  return (
    <div className="space-y-4">
      <BackButton />
      <div className="mx-auto rounded border max-w-lg px-4 py-2 space-y-4">
        <h3 className="text-center font-semibold text-base md:text-xl">
          Create Ticket
        </h3>
        <form
          className="gap-4 grid grid-cols-1 md:grid-cols-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            label="Title"
            id="title"
            error={errors?.title?.message}
            className="col-span-full"
          >
            <Input
              id="title"
              placeholder="Ticket title"
              variant={errors?.title ? 'destructive' : 'default'}
              disabled={isCreating}
              {...register('title', { required: 'Title is required' })}
            />
          </FormControl>
          <FormControl
            label="Category"
            id="category"
            error={errors?.category?.message}
            className="col-span-full"
          >
            <Select
              options={CATEGORIES}
              placeholder="Select category"
              id="category"
              {...register('category', { required: 'Select category' })}
              variant={errors?.category ? 'destructive' : 'default'}
            />
          </FormControl>
          <FormControl
            label="Priority"
            id="priority"
            className="col-span-full"
            error={errors?.priority?.message}
          >
            <Select
              options={PRIORITIES}
              placeholder="Select priority..."
              variant={errors?.priority ? 'destructive' : 'default'}
              id="priority"
              {...register('priority', { required: 'Select priority' })}
            />
          </FormControl>
          <FormControl
            label="Addressed To"
            id="leader"
            className="col-span-full"
            error={errors?.leader?.message}
          >
            <Select
              options={formattedLeaders}
              id="leader"
              variant={errors?.leader ? 'destructive' : 'default'}
              placeholder="Select who to address to"
              {...register('leader', { required: 'Select who to address to' })}
            />
          </FormControl>
          <FormControl
            label="Description"
            id="description"
            className="col-span-full"
            error={errors?.description?.message}
          >
            <Textarea
              id="description"
              placeholder="Enter your message here"
              disabled={isCreating}
              {...register('description', { required: 'Enter description...' })}
              className={errors?.description ? 'border-destructive' : 'border'}
            />
          </FormControl>
          <div className="col-span-full flex gap-2">
            <Button type="submit" className="grow" disabled={isCreating}>
              {isLoading ? <ButtonLoadingText /> : 'Submit'}
            </Button>
            <Button
              type="reset"
              className="grow"
              variant="outline"
              disabled={isCreating}
              onClick={reset}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
