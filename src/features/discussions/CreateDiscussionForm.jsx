import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import FormControl from '../../components/ui/FormControl';
import { Textarea } from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import { useMoveBack } from '../../hooks/use-move-back';
import React, { useEffect } from 'react';
import { useUser } from '../authentication/use-user';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { DevTool } from '@hookform/devtools';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { createDiscussion } from '../../services/discussions-api';

// eslint-disable-next-line react-refresh/only-export-components
export const topicOptions = [
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
];

function CreateDiscussionForm() {
    const { isLoading: isFetching, data } = useUser();
    const userInfo = data?.user

    const { isLoading: isUploading, mutate: upload } = useMutation({
        mutationFn: createDiscussion,
      });

    
    if(isFetching){
        return null
    };

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
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
        upload(formValues)
      };

      useEffect(() => {
        if (isSubmitSuccessful){
          reset()
        }
      },[isSubmitSuccessful,reset])

      console.log(isSubmitSuccessful)


  const goBack = useMoveBack();
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        className="text-xs transition-all hover:text-primary"
        onClick={goBack}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>&nbsp;Back</span>
      </Button>
      <Card className="max-w-2xl mx-4 md:mx-auto mt-2">
        <CardHeader>
          <CardTitle>Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="gap-6 relative space-y-3" onSubmit={handleSubmit(onsubmit)} >
            <FormControl label="Topic" id="topic">
              <Select
                // variant={errors?.joiningAs ? 'destructive' : 'outline'}
                id="topic"
                options={topicOptions}
                size="default"
                placeholder="Select Topic"
                {...register('topic', {
                    required: { value: true, message: 'Please select a topic' },
                  })}
              />
            </FormControl>
            <FormControl label="Title" id="discussionTitle">
              <Input
                // variant={errors?.joiningAs ? 'destructive' : 'outline'}
                id="discussionTitle"
                options={topicOptions}
                size="default"
                placeholder="Title"
                {...register("title", {
                    required: { value: true, message: 'Title is required' },
                  })}

              />
            </FormControl>
            <FormControl label="Description" id="discussionDescription">
              <Textarea 
                id="discussionDescription"
                placeholder="Your Discussion Description here"
                {...register("content", {
                    required: { value: true, message: 'Description is required' },
                  })}

              />
            </FormControl>
            <FormControl
              label="Resources"
              id="resources"
              
            >
              <Input
                id="resources"
                variant={errors?.certificate ? 'destructive' : 'default'}
                type="file"
                {...register('file')}
              />
              <span className="block text-xs text-muted-foreground">
                PNG, JPG or PDF (MAX. 2MB)
              </span>
            </FormControl>
            <Button className='col-span-12 md:col-span-2' type="submit" disabled={isUploading} >
                {isUploading? (
                    <ButtonLoadingText loadingText='Posting...'/>
                ): (
                    'create Discussion'
                )}
            </Button>
          </form>
          <DevTool control={control}/>
        </CardContent>
      </Card>
    </>
  );
}

export default CreateDiscussionForm;
