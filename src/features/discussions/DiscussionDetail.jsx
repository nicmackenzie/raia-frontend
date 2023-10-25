import React from 'react';
import { CardTitle, Card, CardDescription, CardHeader } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import { useParams } from 'react-router-dom';
import discussions from './discussionData';
import Button from '../../components/ui/Button';
import timeElapsed from './dateTime';
import { useQuery } from '@tanstack/react-query';
import { getDiscussionById } from '../../services/discussions-api';

function DiscussionDetail() {
  const params = useParams();
  console.log(params);
  const id = params.id;

  const { isLoading, data } = useQuery({
      queryFn: () => getDiscussionById(id),
      queryKey: ['discussion'],
    });
  
    if (isLoading){return null};
    console.log(data);

    const comments = data.discussion_replies
    console.log(comments);

  
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
      <div id='comment container'>
        <p className='text-lg font-semibold text-slate-500'>{data.discussion_replies.length} Responses</p>
        <div>
        {comments.map((comment) => {
              return (
                <div key={comment.id}> 
                  
                      <div className='flex '>
                        <Avatar className='flex justify-center mt-6' src='https://i.pravatar.cc/48?u=123123' size='lg' alt='user avater'/>
                        <div className='pt-6 px-3 w-full'>
                          <CardTitle className='text-xl'>{comment.created_by} </CardTitle>
                          <div className='flex justify-between text-slate-400'>
                            <span>username</span>
                            <span>{timeElapsed(comment.time_created)} </span>
                          </div>
                        </div>
                      </div>
                   
                  
                  
                  <CardDescription className='text-slate-500 pt-3 px-16'>{comment.text} </CardDescription>
                </div>
              )
        })}
        </div>
      </div>
      <form >
        <FormControl
           id='comment'
           className='fixed bottom-0 w-full md:w-3/6 '
        >
          <Input
            id='comment'
            placeholder='Post your opinion'
            className=' bg-white md:h-12 pt-2 '
            
          />
          <Button variant='secondary' type='submit' className='absolute top-0 right-0 z-2'>Post</Button>
        </FormControl>
      </form>
      
    </div>
  )
}

export default DiscussionDetail