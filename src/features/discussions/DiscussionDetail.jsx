import React from 'react';
import { CardTitle, Card, CardDescription, CardHeader } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import { useParams } from 'react-router-dom';
import discussions from './discussionData';
import Button from '../../components/ui/Button';

function DiscussionDetail() {
  const params = useParams();
  console.log(params);
  
  const selectedDiscussion = discussions.find((discussion) => discussion.id === params.id);
  const comments = selectedDiscussion.comments;

  function timeElapsed(timestamp){
    const discussionTimestamp = new Date(`${timestamp}`);
    const currentTime = new Date();
    const timeDifferenceMil = Math.abs(currentTime - discussionTimestamp)

    const seconds = Math.floor(timeDifferenceMil / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); 
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 30) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }

  }
  

  return (
    <div>
      <div className='pb-6'>
        <div className='flex'>
          <Avatar className='flex justify-center mt-4' src='https://i.pravatar.cc/48?u=123123' size='lg' alt='user avater' />
          <div className=' pt-6 px-3 py-3'>
            <CardTitle className='text-xl' >{selectedDiscussion.created_by} </CardTitle>
            <span className='text-slate-400'>{timeElapsed(selectedDiscussion.time_created)} </span>
          </div>
        </div>
        <div className='pt-4'>
          <CardTitle>{selectedDiscussion.title}</CardTitle>
          <CardDescription className='text-slate-500' >{selectedDiscussion.description} </CardDescription>
        </div>
      </div>
      <div id='comment container'>
        <p className='text-lg font-semibold text-slate-500'>{comments.length} Responses</p>
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
          <Button className=''>T</Button>
        </FormControl>
      </form>
      
    </div>
  )
}

export default DiscussionDetail