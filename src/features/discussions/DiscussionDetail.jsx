import React from 'react';
import { CardTitle, Card, CardDescription, CardHeader } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import FormControl from '../../components/ui/FormControl';
import { useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import timeElapsed from './dateTime';
import { getDiscussionById, postResponse, getDiscussionResponses } from '../../services/discussions-api';
import { useState, useEffect } from 'react';
import { Textarea } from '../../components/ui/TextArea';
import { ActionCable } from 'actioncable';
import { useForm } from 'react-hook-form';
import { useUser } from '../authentication/use-user';
import { DevTool } from '@hookform/devtools';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';



function DiscussionDetail() {
  const [responses, setResponses] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const queryclient = useQueryClient()
  const { isLoading, data } = useQuery({
    queryFn: () => getDiscussionById(id),
    queryKey: ['discussion'],
  });

  const { isLoading: isGetting, data: replies } = useQuery({
    queryFn: () => getDiscussionResponses(id),
    queryKey: ['discussion-reply'],
  });


  const { isLoading: isPosting, mutate: post } = useMutation({
    mutationFn: postResponse,
    onSuccess: () => {
      queryclient.invalidateQueries({queryKey: ['discussion-reply']})
    }
  });



  const { isLoading: isFetching, data: user } = useUser();

  

  const params = useParams();
  const id = parseInt(params.id);

  const handleReceivedMessage = (response) => {
    setResponses((prevResponses) => [...prevResponses, response]) 
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: '',
      file: '',
    },
  });

  const onsubmit = (values) => {
    const formValues = {...values, id: userInfo.id, discussion_id: id}
    console.log('values submitted', formValues)
    post(formValues);
    handleReceivedMessage(values.content)
  };

  if (isFetching){return null};
  const userInfo = user?.user;
  if (isLoading){return null};
  if (isGetting){return null};

  return (
    <div>
      <div className='pb-6'>
        <div className='flex'>
          <Avatar className='flex justify-center mt-4' src='https://i.pravatar.cc/48?u=123123' size='lg' alt='user avater' />
          <div className=' pt-6 px-3 py-3'>
            <CardTitle className='text-xl' >{data.created_by} </CardTitle>
            <span className='text-slate-400'>{timeElapsed(data.created_at)} </span>
          </div>
        </div>
        <div className='pt-4 space-y-3'>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription className='text-slate-500 text-base' >{data.content} </CardDescription>
        </div>
      </div>
      <div id='responses container' className=' mb-80'>
        <p className='text-lg font-semibold text-slate-500'>{replies.length} Responses</p>
        <div>
        {replies.map((reply) => {
              return (
                <div key={reply.id}> 
                  
                      <div className='flex '>
                        <Avatar className='flex justify-center mt-6' src='https://i.pravatar.cc/48?u=123123' size='lg' alt='user avater'/>
                        <div className='pt-6 px-3 w-full'>
                          <CardTitle className='text-xl'>{reply.user.full_name} </CardTitle>
                          <div className='flex justify-between text-slate-400'>
                            <span>username</span>
                            <span>{timeElapsed(reply.created_at)} </span>
                          </div>
                        </div>
                      </div>
                   
                  
                  
                  <CardDescription className='text-slate-500 pt-3 px-16'>{reply.content} </CardDescription>
                </div>
              )
        })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onsubmit)}>
        <FormControl
           id='comment'
           className='fixed bottom-0 w-full md:w-3/6 '
        >
          <Textarea
            id='comment'
            placeholder='Post your opinion'
            className=' bg-white md:h-12 pt-2 '
            {...register("content", {
              required: { value: true },
            })}
            
          />
          <Button 
            // variant='secondary' 
            type='submit' 
            className='absolute top-0 right-0 z-2 '
            disabled={isPosting}
          >
            {isPosting? (
                    <ButtonLoadingText loadingText='Posting...'/>
                ): (
                    'Post'
                )}
              
          </Button>
        </FormControl>
      </form>
      <DevTool control={control} />
      
    </div>
  )
}

export default DiscussionDetail