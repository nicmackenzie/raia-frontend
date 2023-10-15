import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription,CardContent, CardFooter } from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'

function DiscussionCard() {
  return (
    <div>
      <Button>Start a discussion</Button>
      <div className='grid grid-cols-1 md:grid-cols-2'>
          <Card>
              <div className='flex'>
                  <Avatar className='flex justify-center mt-4' src='https://i.pravatar.cc/48?u=123123' size='lg' alt='user avater' />
                  <CardHeader>
                     <CardTitle className='text-xl'>User Name</CardTitle>
                     <CardDescription>time posted</CardDescription>
                  </CardHeader>
              </div>
              <CardHeader>
              <CardTitle>Discussion title</CardTitle>
              </CardHeader>
              <CardContent className='text-slate-600' >
                 <p>Card Content</p>
              </CardContent>
              <CardFooter className='space-x-3 text-muted-foreground'>
                <span>replies</span>
                <span>upvotes</span>
              </CardFooter>
          </Card>
      </div>
    </div>
  )
}

export default DiscussionCard