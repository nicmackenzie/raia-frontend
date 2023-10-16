import React from 'react'
import { CardTitle, Card, CardDescription, CardHeader } from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import FormControl from '../../components/ui/FormControl'
import Input from '../../components/ui/Input'

function DiscussonDetail() {
  return (
    <div>
      <div className='pb-6'>
        <div className='flex'>
          <Avatar className='flex justify-center mt-4' src='https://i.pravatar.cc/48?u=123123' size='lg' alt='user avater' />
          <div className=' pt-6 px-3 py-3'>
            <CardTitle className='text-xl' >Discussion owner name</CardTitle>
            <span className='text-slate-400'>time since post</span>
          </div>
        </div>
        <div className='pt-4'>
          <CardTitle>Discussion Title</CardTitle>
          <CardDescription className='text-slate-500' >Discussion content</CardDescription>
        </div>
      </div>
      <div id='comment container'>
        <p className='text-lg font-semibold text-slate-500'>Responses</p>
        <div>
          <div >
            <div className='flex '>
              <Avatar className='flex justify-center mt-6' src='https://i.pravatar.cc/48?u=123123' size='lg' alt='user avater'/>
              <div className='pt-6 px-3 w-full'>
                <CardTitle className='text-xl'>user name</CardTitle>

                <div className='flex justify-between text-slate-400'>
                  <span>username</span>
                  <span> time since post</span>
                </div>
              </div>
              
            </div>
            
            <CardDescription className='text-slate-500 pt-3 px-16'>Quisque vel vehicula nunc. Sed eu eros aliquam, efficitur leo sed, dignissim mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec euismod enim eros, non commodo mauris malesuada eu. Morbi mattis sem at enim ornare, vel ultrices metus elementum.</CardDescription>
          </div>
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
        </FormControl>
      </form>
      
    </div>
  )
}

export default DiscussonDetail