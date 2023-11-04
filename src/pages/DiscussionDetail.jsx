import { CardTitle, Card, CardDescription, CardHeader } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import { useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import timeElapsed from './dateTime';
import { useQuery } from '@tanstack/react-query';
import { getDiscussionById } from '../../services/discussions-api';

import { Textarea } from '../../components/ui/TextArea';
import { ActionCable } from 'actioncable';
import { useForm } from 'react-hook-form';
import { useUser } from '../authentication/use-user';
import { DevTool } from '@hookform/devtools';


function DiscussionDetail() {
  const [responses, setResponses] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { isLoading, data } = useQuery({
    queryFn: () => getDiscussionById(id),
    queryKey: ['discussion'],
  });

  const { isLoading: isFetching, data: user } = useUser();

  

  const params = useParams();
  const id = params.id;

  if (isFetching){return null}

  const userInfo = user?.user

  if (isLoading){return null};
  console.log(data);

  const comments = data.discussion_replies
  console.log(comments);

  const cable = ActionCable.createConsumer('ws://localhost:3000/cable');


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
      content: ''
    },
  });

  const onsubmit = (values) => {
    const formValues = {...values, id: userInfo.id, discussion_id: id}
    console.log('values submitted', formValues)
    // upload(formValues)
  }


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
      <div id='respnses container'>
        <h3>Responses</h3>
        <p> Discussion id: ${id}</p>
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
          <Button variant='secondary' type='submit' className='absolute top-0 right-0 z-2'>Post</Button>
        </FormControl>
      </form>
      <DevTool control={control} />
      
    </div>
  )
}

export default DiscussionDetail