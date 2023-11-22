import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';
import { getProfile } from '../../services/profile-api';
import StarRating from '../../components/ui/StarRating';

import FormControl from '../../components/ui/FormControl';
import Select from '../../components/ui/Select';
import { Textarea } from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';
import { postReview } from '../../services/reviews-api';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { useUser } from '../authentication/use-user';

function LeaderReview() {
  const [userInfo, setUserInfo] = useState({});
  const { username } = useParams();
  const [rating, setRating] = useState();
  const { user = {} } = useUser();

  const { isLoading, data, error } = useQuery({
    queryFn: () => getProfile(username),
    queryKey: ['leader-review', username],
  });

  const CATEGORY_OPTIONS = [
    { value: 'governance', label: 'Governance' },
    { value: 'fund-utilization', label: 'Fund Utilization' },
    { value: 'development', label: 'Development' },
    { value: 'community-outreach', label: 'Community Outreach' },
  ];

  useEffect(
    function () {
      setUserInfo(data);
    },
    [username, data]
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: '',
      comment: '',
    },
  });

  const { isLoading: isSubmitting, mutate: review } = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      toast.success('Review submitted successfully');
      reset();
      setRating(0);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <Loader />;

  if (error) {
    return <p className="text-destructive">{error.message}</p>;
  }

  if (userInfo?.role === 'citizen') {
    return <p>You are only allowed to rate your leaders</p>;
  }

  function onSubmit(values) {
    if (!rating || rating === 0) {
      toast.error('Select a rating');
      return;
    }
    const formData = {
      content: values.comment,
      category: values.category,
      leader_id: userInfo.id,
      reviewer_id: user.id,
      rating,
    };
    review(formData);
  }

  return (
    <div className="max-w-lg bg-card border py-2 px-4 mx-4 md:mx-auto rounded md:rounded-md space-y-6">
      <h2 className="text-lg md:text-2xl text-gold text-center font-semibold">
        Review your leader
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormControl error={errors?.category?.message}>
          <Select
            options={CATEGORY_OPTIONS}
            variant={errors?.category ? 'destructive' : 'default'}
            placeholder="Select category"
            disabled={isSubmitting}
            {...register('category', {
              required: { value: true, message: 'Fields is required' },
            })}
          />
        </FormControl>
        <StarRating size="lg" onRate={setRating} defaultRating={rating || 0} />
        <FormControl error={errors?.comment?.message}>
          <Textarea
            placeholder="Enter your comment"
            {...register('comment', {
              required: { value: true, message: 'Comment is required' },
            })}
            disabled={isSubmitting}
            className={errors?.comment ? 'border-destructive' : ''}
          />
        </FormControl>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <ButtonLoadingText loadingText="Submitting review..." />
          ) : (
            'Review'
          )}
        </Button>
      </form>
    </div>
  );
}

export default LeaderReview;
