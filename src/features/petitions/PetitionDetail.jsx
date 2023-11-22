import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetition, signPetition } from '../../services/petitions-api';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';
import FormControl from '../../components/ui/FormControl';
import Avatar from '../../components/ui/Avatar';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { Progress } from '../../components/ui/Progress';
import { formatDateDistance, notificationInitialState } from '../../lib/utils';
import Button, { BackButton } from '../../components/ui/Button';
// import Avatar from '../../components/ui/Avatar';
import { HeartHandshake } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Textarea } from '../../components/ui/TextArea';
import { useForm } from 'react-hook-form';
import { useUser } from '../authentication/use-user';

function PetitionDetail() {
  const { slug } = useParams();
  const [petition, setPetition] = useState({});
  const [isSigned, setIsSigned] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState(notificationInitialState);
  const { isLoading, data, error } = useQuery({
    queryFn: () => getPetition(slug),
    queryKey: ['petitions', slug],
  });

  const { isLoading: isSigning, mutate: sign } = useMutation({
    mutationFn: signPetition,
  });

  function resetNotification() {
    setNotification(notificationInitialState);
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason: '',
    },
  });

  useEffect(
    function () {
      if (data) {
        setPetition(data);
      }
    },
    [slug, data]
  );

  if (isLoading) return <Loader type="spinner" size="md" />;
  if (!petition) return null;

  const percentage = Math.round(
    petition?.petition_count / petition?.target_signature
  );

  const hasSigned = petition?.petition_signatures?.some(
    petition => petition?.user?.id === user?.id
  );

  function onSubmit(value) {
    const reason =
      value.reason.toString().trim() === ''
        ? null
        : value.reason.toString().trim();
    sign(
      { reason, id: petition.id },
      {
        onSuccess: () => {
          setIsSigned(true);
          setNotification({
            displayed: true,
            message: 'Thanks for your support',
            variant: 'success',
          });
          queryClient.invalidateQueries({
            queryKey: ['petitions'],
          });
        },
        onError: error => {
          setNotification({
            displayed: true,
            message: error.message,
            variant: 'error',
          });
        },
      }
    );
  }

  return (
    <div className="m-4">
      {error && (
        <Alert
          message={error}
          variant="error"
          dismissable={false}
          className="max-w-xl"
        />
      )}
      <BackButton />
      <header className="grid grid-cols-1 md:grid-cols-12 mt-4 gap-4">
        <div className="col-span-full md:col-span-8 rounded-md overflow-hidden">
          <img
            src={petition.petition_poster}
            className="w-full aspect-video object-cover"
            alt={`poster for ${petition.title}`}
          />
        </div>
        <div className="col-span-full md:col-span-4 md:self-center space-y-3">
          <div className="flex items-center gap-1">
            <Avatar
              src={petition?.user?.profile_image}
              alt={`Avatar for ${petition?.user?.full_name}`}
              size="xl"
            />
            <div>
              <div className="text-sm font-semibold">
                {petition?.user?.full_name}
              </div>
              <p className="text-muted-foreground text-xs">
                @{petition?.user?.username}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground font-semibold">
            Started{' '}
            <span>
              {petition?.created_at &&
                formatDateDistance(new Date(petition?.created_at))}
            </span>
          </div>
          <div>
            <span className="text-sm text-primary inline-block font-semibold mb-1">
              {petition?.petition_count} signatures of{' '}
              {petition?.target_signature}
            </span>
            <Progress value={percentage} />
          </div>
          <Button
            className="w-full bg-gold/70 text-tertiary hover:bg-gold/90 flex items-center gap-2"
            disabled={isSigning}
          >
            <HeartHandshake /> <span>Donate</span>
          </Button>
          {notification.displayed && (
            <Alert
              message={notification.message}
              variant={notification.variant}
              dismissable
              onClose={resetNotification}
            />
          )}
          {!isSigned && !hasSigned ? (
            <form
              className="max-w-2xl mt-4 space-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl
                label="Reason for signing"
                id="reason"
                error={errors?.reason?.message}
              >
                <Textarea
                  id="reason"
                  disabled={isSigning}
                  {...register('reason', {
                    minLength: {
                      value: 20,
                      message: 'Comment needs to be 20 characters and above',
                    },
                  })}
                  className={errors?.reason ? 'border-destructive' : ''}
                />
              </FormControl>
              <Button type="submit" className="w-full md:w-1/2">
                {isSigning ? (
                  <ButtonLoadingText loadingText="Signing..." />
                ) : (
                  'Sign petition'
                )}
              </Button>
            </form>
          ) : (
            <Button disabled className="w-full">
              You have already signed this petition
            </Button>
          )}
        </div>
      </header>
      <div className="my-6">
        <Badge className="text-xs uppercase" size="sm">
          {petition?.topic}
        </Badge>
        <h1 className="text-2xl md:text-4xl font-bold mt-1 text-tertiary">
          {petition.title}
        </h1>
      </div>
      <div
        className="max-w-2xl text-sm"
        dangerouslySetInnerHTML={{ __html: petition?.description }}
      />

      <div className="mt-6">
        <h5 className="text-lg font-semibold text-primary mb-3">Comments</h5>
        {petition?.petition_signatures
          ?.filter(signature => signature.reason_for_signing !== '')
          .map(comment => (
            <div
              className="max-w-2xl grid grid-cols-comment gap-x-4 gap-y-2"
              key={comment.id}
            >
              <Avatar src={comment?.user?.profile_image} alt="some name" />
              <div className="self-end">
                <p className="text-xs font-medium">
                  {comment?.user?.full_name}
                </p>
                <span className="text-xs text-muted-foreground">
                  {comment?.created_at &&
                    formatDateDistance(new Date(comment.created_at))}
                </span>
              </div>
              <p className="col-start-2">{comment?.reason_for_signing}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PetitionDetail;
