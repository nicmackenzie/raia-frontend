import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/Modal';
import ImageUploader from '../../components/ui/ImageUploader';
import Alert from '../../components/ui/Alert';
import Input from '../../components/ui/Input';
import FormControl from '../../components/ui/FormControl';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';

import lightPoll from '../../assets/resource-light.svg';
import darkPoll from '../../assets/resource-light.svg';
import { allowedFileTypes } from '../profile/Verification';
import { cn } from '../../lib/utils';
import {
  createBarazaResource,
  getResources,
} from '../../services/discussions-api';
import { useTheme } from '../../context/theme-provider';
import { Plus } from 'lucide-react';
import Resource from './Resource';

function BarazaResources() {
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [resources, setResources] = useState([]);
  const [resourceDetails, setResourceDetails] = useState({
    image: null,
    isSet: false,
  });

  const {
    isLoading: isFetching,
    data,
    error: fetchError,
  } = useQuery({
    queryFn: () => getResources(id),
    queryKey: ['barazas', id, 'resources'],
  });

  useEffect(
    function () {
      if (data) {
        setResources(data?.data);
      }
    },
    [data]
  );

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { resource: '', description: '' } });

  const resourceImageRegister = register('resource', { required: true });
  const { isLoading, mutate: upload } = useMutation({
    mutationFn: createBarazaResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['barazas'] });
      handleClose();
    },
    onError: err => {
      setError(err.message);
    },
  });

  function onSubmit(values) {
    if (values.resource.length > 0) {
      const fileType = values.resource[0].type.split('/')[1];
      if (!allowedFileTypes.includes(fileType)) {
        toast.error(
          'Selected file type not allowed.Can either be a PDF,JPEG,JPG or PNG'
        );
        return;
      }
      if (values.resource[0].size > 2000000) {
        toast.error('Selected file exceeds allowed limit of 2MB');
        return;
      }
    }
    upload({ values, id });
  }

  function handleClose() {
    setOpen(false);
  }

  if (isFetching) return <Loader type="spinner" />;

  if (fetchError)
    return <Alert message={error} variant="error" dismissable={false} />;

  return (
    <div className="px-4 py-2">
      <Button
        onClick={() => setOpen(true)}
        className="h-12 w-12 rounded-full bg-primary/25 text-primary transition-colors hover:bg-primary/25 absolute right-6 bottom-4"
      >
        <Plus className="w-4 h-4" />
      </Button>
      <Dialog onOpenChange={handleClose} open={open}>
        <DialogContent className="sm:max-w-[425px]">
          {error && (
            <Alert message={error} variant="error" onClose={setError} />
          )}
          <DialogHeader>
            <DialogTitle>Upload a resource</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {!resourceDetails.isSet ? (
              <ImageUploader>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  {...resourceImageRegister}
                  onChange={e => {
                    resourceImageRegister.onChange(e);
                    setResourceDetails(prev => ({
                      ...prev,
                      image: getValues('resource')[0].name,
                      isSet: true,
                    }));
                  }}
                />
              </ImageUploader>
            ) : (
              <UploadedImage fileName={resourceDetails.image} />
            )}
            <FormControl
              error={errors?.description?.message}
              id="description"
              label="Resource description"
            >
              <Input
                id="description"
                placeholder="Enter small description on resource"
                {...register('description', {
                  required: 'Please provide small description',
                })}
              />
            </FormControl>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <ButtonLoadingText loadingText="Uploading..." />
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {resources.length === 0 ? (
        <>
          {' '}
          <img
            src={theme === 'dark' ? darkPoll : lightPoll}
            alt="Poll illustrator"
            className="w-72 md:w-96 h-auto m-4 md:mx-auto rounded-md"
          />
          <p className="text-center font-semibold text-muted-foreground">
            No resources added
          </p>{' '}
        </>
      ) : (
        <div className="space-y-4">
          {resources.map(resource => (
            <Resource key={resource.id} {...resource} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BarazaResources;

function UploadedImage({ fileName }) {
  return (
    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-4">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className={cn(
              'relative rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2'
            )}
          >
            <span>{fileName}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
