import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ChevronUp, Clock, Dot, User } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import Button, { BackButton } from '../../components/ui/Button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/Tab';
import {
  getDiscussionById,
  postResponse,
} from '../../services/discussions-api';

import { useForm } from 'react-hook-form';
import { useUser } from '../authentication/use-user';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import Alert from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { cn, formatDateDistance } from '../../lib/utils';
import DiscussionDetails from './DiscussionDetails';
import DiscussionChat from './DiscussionChat';
import DiscussionActivities from './DiscussionActivities';

function DiscussionDetail() {
  const [discussionDetails, setDiscussionDetails] = useState({});
  const [isLive, setIsLive] = useState(false);

  const { id } = useParams();
  // const [newMessage, setNewMessage] = useState('');

  const queryclient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryFn: () => getDiscussionById(id),
    queryKey: ['discussion'],
  });

  useEffect(
    function () {
      setDiscussionDetails(data);
    },
    [id, data]
  );

  // const { isLoading: isGetting, data: replies } = useQuery({
  //   queryFn: () => getDiscussionResponses(id),
  //   queryKey: ['discussion-reply'],
  // });

  const { isLoading: isPosting, mutate: post } = useMutation({
    mutationFn: postResponse,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['discussion-reply'] });
    },
  });

  const { isLoading: isFetching, data: user } = useUser();

  if (isFetching || isLoading) {
    return <Loader type="spinner" size="md" />;
  }

  if (error) {
    return (
      <Alert
        className="max-w-lg mt-4"
        message={error.message}
        dismissable={false}
        variant="error"
      />
    );
  }

  return (
    <div className="p-4">
      <BackButton />
      <Tabs defaultValue="details" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          {isLive && (
            <>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value="details">
          <DiscussionDetails
            discussionDetails={discussionDetails}
            isLive={isLive}
            setIsLive={setIsLive}
          />
        </TabsContent>
        <TabsContent value="chat">
          <DiscussionChat discussionId={id} />
        </TabsContent>
        <TabsContent value="activity">
          <DiscussionActivities />
        </TabsContent>
      </Tabs>
      {/* <div className="pb-6">
        <div className="flex">
          <Avatar
            className="flex justify-center mt-4"
            src="https://i.pravatar.cc/48?u=123123"
            size="lg"
            alt="user avater"
          />
          <div className=" pt-6 px-3 py-3">
            <CardTitle className="text-xl">{data.created_by} </CardTitle>
            <span className="text-slate-400">
              {timeElapsed(data.created_at)}{' '}
            </span>
          </div>
        </div>
        <div className="pt-4 space-y-3">
          <CardTitle>{data.title}</CardTitle>
          <CardDescription className="text-slate-500 text-base">
            {data.content}{' '}
          </CardDescription>
        </div>
      </div>
      <div id="responses container" className=" mb-80">
        <p className="text-lg font-semibold text-slate-500">
          {replies.length} Responses
        </p>
        <div>
          {replies.map(reply => {
            return (
              <div key={reply.id}>
                <div className="flex ">
                  <Avatar
                    className="flex justify-center mt-6"
                    src="https://i.pravatar.cc/48?u=123123"
                    size="lg"
                    alt="user avater"
                  />
                  <div className="pt-6 px-3 w-full">
                    <CardTitle className="text-xl">
                      {reply.user.full_name}{' '}
                    </CardTitle>
                    <div className="flex justify-between text-slate-400">
                      <span>username</span>
                      <span>{timeElapsed(reply.created_at)} </span>
                    </div>
                  </div>
                </div>

                <CardDescription className="text-slate-500 pt-3 px-16">
                  {reply.content}{' '}
                </CardDescription>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onsubmit)}>
        <FormControl id="comment" className="fixed bottom-0 w-full md:w-3/6 ">
          <Textarea
            id="comment"
            placeholder="Post your opinion"
            className=" bg-white md:h-12 pt-2 "
            {...register('content', {
              required: { value: true },
            })}
          />
          <Button
            // variant='secondary'
            type="submit"
            className="absolute top-0 right-0 z-2 "
            disabled={isPosting}
          >
            {isPosting ? (
              <ButtonLoadingText loadingText="Posting..." />
            ) : (
              'Post'
            )}
          </Button>
        </FormControl>
      </form>
      <DevTool control={control} /> */}
    </div>
  );
}

export default DiscussionDetail;
