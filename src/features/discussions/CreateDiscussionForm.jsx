import React from 'react'
import { Card, CardTitle } from '../../components/ui/Card'
import { FormInput } from 'lucide-react'
import FormControl from '../../components/ui/FormControl'
import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const topicOptions = [
    {value: 'Infrastructure', label: 'Infrastructure'},
    {value: 'healthcare', label: 'Healthcare'},
    {value: 'education', label: 'Education'},
    {value: 'finance', label: 'Finance'}

]

function CreateDiscussionForm() {
  return (
    <div>
        <Card>
            <CardTitle>Create your Discussion here</CardTitle>
            <form className='gap-6 bg-background px-6 pt-12  pb-6 relative space-y-3' >
                <FormControl
                   label='Topic'
                   id='topic'
                >
                   <Select
                       // variant={errors?.joiningAs ? 'destructive' : 'outline'}
                       id="topic"
                       options={topicOptions}
                       size="default"
                       placeholder="Select Topic" 
                   />

                </FormControl>
                <FormControl
                   label='Title'
                   id='discussionTitle'
                >
                   <Input
                       // variant={errors?.joiningAs ? 'destructive' : 'outline'}
                       id="discussionTitle"
                       options={topicOptions}
                       size="default"
                       placeholder="Title" 
                   />

                </FormControl>
                <FormControl
                   label='Description'
                   id='discussionDescription'
                   
                >
                   <Input
                       // variant={errors?.joiningAs ? 'destructive' : 'outline'}
                       id="discussionDescription"
                       size="default"
                       placeholder="Your Discussion content/question here" 
                   />

                </FormControl>
                <Button>Create discussion</Button>
            </form>
        </Card>
    </div>
  )
}

export default CreateDiscussionForm