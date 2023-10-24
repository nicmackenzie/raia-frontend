import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button, { BackButton } from '../../components/ui/Button';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/Select2';
import { useState } from 'react';
import ImageUploader from '../../components/ui/ImageUploader';
import { useForm } from 'react-hook-form';
import { topicOptions } from '../discussions/CreateDiscussionForm';
import {
  isAllowedFileTypes,
  replaceEmptyStringsWithNull,
} from '../../lib/utils';
import { useMutation } from '@tanstack/react-query';
import { createPetition } from '../../services/petitions-api';
import { useNavigate } from 'react-router-dom';

const allowedFileTypes = ['jpg', 'jpeg', 'png'];

function PetitionForm() {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { isLoading: isCreating, mutate: create } = useMutation({
    mutationFn: createPetition,
  });

  const {
    handleSubmit,

    setValue,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      topic: '',
      target_signature: '',
      petition_poster: '',
    },
  });

  const isInteger = value => {
    return /^[0-9]+$/.test(value);
  };

  function onSubmit(values) {
    if (
      values.petition_poster.length > 0 &&
      !isAllowedFileTypes(values.petition_poster[0], allowedFileTypes)
    ) {
      setError('Invalid file type uploaded for poster');
      return;
    }
    if (description.trim().length === 0 || description === '') {
      setError('Petition description');
      return;
    }

    const formFields = {
      ...replaceEmptyStringsWithNull(values),
      description,
    };
    create(formFields, {
      onSuccess: () => {
        navigate('/petitions');
      },
      onError: err => {
        setError(err.message);
      },
    });
  }

  return (
    <>
      <BackButton />
      {error && (
        <Alert
          message={error}
          variant="error"
          onClose={setError}
          className="max-w-xl mx-4 md:mx-auto mb-4"
        />
      )}
      <form
        className="max-w-4xl mx-4 md:mx-auto border rounded py-2 px-4 h-max"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="text-center text-lg md:text-2xl font-bold">
          Create Petition
        </header>
        <div className="space-y-3">
          <FormControl
            label="Title"
            id="title"
            className="col-span-full"
            error={errors?.title?.message}
          >
            <Input
              placeholder="Title of your petition"
              variant={errors?.title ? 'destructive' : 'default'}
              disabled={isCreating}
              id="title"
              {...register('title', {
                required: 'Topic is required',
                minLength: {
                  value: 20,
                  message: 'Topic has to be 20 characters or more',
                },
              })}
            />
          </FormControl>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <FormControl
              label="Topic"
              id="topic"
              className="flex-1"
              error={errors?.topic?.message}
            >
              <Select
                onValueChange={val => setValue('topic', val)}
                disabled={isCreating}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select topic..." />
                </SelectTrigger>
                <SelectContent>
                  {topicOptions?.map(topic => (
                    <SelectItem value={topic.value} key={topic.value}>
                      {topic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl
              label="Target Signatures"
              id="target_signature"
              className="flex-1"
              error={errors?.target_signature?.message}
            >
              <Input
                size="large"
                type="number"
                disabled={isCreating}
                placeholder="Title of your petition"
                id="target_signature"
                variant={errors?.target_signatures ? 'destructive' : 'default'}
                {...register('target_signature', {
                  required: 'Fields is required',
                  min: {
                    value: 200,
                    message: 'Target cannot be less than 200',
                  },
                  validate: value =>
                    isInteger(value) || 'Please enter a valid integer',
                })}
              />
            </FormControl>
          </div>
          <FormControl label="Poster" id="file-upload">
            <ImageUploader isLoading={isCreating}>
              <Input
                type="file"
                className="sr-only"
                id="file-upload"
                {...register('petition_poster')}
                disabled={isCreating}
              />
            </ImageUploader>
          </FormControl>
          <FormControl
            label="Description"
            id="description"
            className="col-span-12 h-56"
          >
            <ReactQuill
              theme="snow"
              id="description"
              value={description}
              onChange={setDescription}
              style={{ height: '140px' }}
            />
          </FormControl>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            type="submit"
            className="w-full lg:w-44"
            disabled={isCreating}
          >
            {isCreating ? (
              <ButtonLoadingText loadingText="Creating..." />
            ) : (
              'Save'
            )}
          </Button>
          <Button
            type="reset"
            variant="outline"
            className="w-full lg:w-44"
            disabled={isCreating}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}

export default PetitionForm;
