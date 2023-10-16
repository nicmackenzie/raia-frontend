import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription,CardContent, CardFooter } from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import discussions from './discussionData'
import { useUser } from '../authentication/use-user'
import { useNavigate, Link } from 'react-router-dom'

function DiscussionCard() {
  const navigate = useNavigate();
  const data = useUser();
  const role = data?.user_metadata?.role.toLowerCase;

  // function handleClick(){
  //   navigate('discussions/:id')
  // };
  // console.log(discussions);

  return (
    <div>
      {role === "leader"? <Button>Start a discussion</Button> : <></>}
      <div className='grid grid-cols-1 md:grid-cols-2 ' >
        { discussions.map((discussion) => {
          return (
          <Link to={`/discussions/${discussion.id}`}>
            <Card className=' pb-4' key={discussion.id}>
                <div className='flex'>
                    <Avatar className='flex justify-center mt-4' src='https://i.pravatar.cc/48?u=123123' size='lg' alt='user avater' />
                    <CardHeader>
                       <CardTitle className='text-xl'>{discussion.created_by}</CardTitle>
                       <CardDescription>time posted</CardDescription>
                    </CardHeader>
                </div>
                <CardHeader>
                <CardTitle>{discussion.title}</CardTitle>
                </CardHeader>
                <CardContent className='text-slate-600' >
                   <p>{discussion.description}</p>
                </CardContent>
                <CardFooter className='space-x-3 text-muted-foreground'>
                  <span>replies</span>
                  <span>upvotes</span>
                </CardFooter>
            </Card>
          </Link>
          )})}
      </div>
    </div>
  )
}

export default DiscussionCard