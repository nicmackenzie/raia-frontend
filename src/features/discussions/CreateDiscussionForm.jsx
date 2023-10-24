import React from 'react';
import { Card, CardTitle } from '../../components/ui/Card';
import FormControl from '../../components/ui/FormControl';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useUser } from '../authentication/use-user';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { DevTool } from '@hookform/devtools';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';

const topicOptions = [
    {value: 'Infrastructure', label: 'Infrastructure'},
    {value: 'healthcare', label: 'Healthcare'},
    {value: 'education', label: 'Education'},
    {value: 'finance', label: 'Finance'}

]

function CreateDiscussionForm() {
    const { isLoading: isFetching, data } = useUser();
    const userInfo = data?.user

    if(isFetching){
        return null
    }


    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          title: '',
          content: '',
          file: ''
        },
      });

      const onsubmit = (values) => {
        const formValues = {...values, id: userInfo.id}
        console.log('values submitted', formValues)
      }


  return (
    <div>
        <Card>
            <CardTitle>Create your Discussion here</CardTitle>
            <form className='gap-6 bg-background px-6 pt-12  pb-6 relative space-y-3' onSubmit={handleSubmit(onsubmit)} >
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
                    //    {...register("topic")}
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
                       {...register("title")}
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
                       {...register("content")}
                   />

                </FormControl>
              <p className='' >Upload resources for this dialogue</p>

                <FormControl
                   label="Discussion files"
                   id="file"
                >
                    <Input
                id="file"
                // variant={errors?.certificate ? 'destructive' : 'default'}
                type="file"
                // {...register("file")}
                // {...register('certificate', {
                //   required: { value: true, message: 'Certificate is required' },
                // })}
              />
              <span className="block text-xs text-muted-foreground">
                PNG, JPG or PDF (MAX. 2MB)
              </span>
            </FormControl>
                <Button type='submit' >Create discussion</Button>
            </form>
            <DevTool control={control}/>
        </Card>
    </div>
  )
}

export default CreateDiscussionForm