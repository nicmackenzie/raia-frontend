import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription,CardContent, CardFooter } from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'

function DiscussionCard() {
  return (
    <div>
        <Card>
            <div>
                <Avatar size='sm' alt='user avater' />
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
  )
}

export default DiscussionCard