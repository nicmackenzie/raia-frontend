import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useCounties } from '../../hooks/use-counties';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { uploadLeaderCertificate } from '../../services/profile-api';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { useNavigate } from 'react-router-dom';

const options = [
  { value: 'governor', label: 'Governor' },
  { value: 'senetaor', label: 'Senator' },
  { value: 'mp', label: 'Member Of Parliament(MP)' },
  { value: 'women-rep', label: 'Women Rep' },
  { value: 'mca', label: 'MCA' },
];
const allowedFileTypes = ['pdf', 'jpg', 'jpeg', 'png'];

function Verification() {
  const { isLoading, counties } = useCounties();
  const navigate = useNavigate();
  const { isLoading: isUploading, mutate: upload } = useMutation({
    mutationFn: uploadLeaderCertificate,
  });

  const countyOptions = counties?.map(county => ({
    value: county.id,
    label: county.name,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      position: '',
      county: '',
      certificate: '',
    },
  });

  if (isLoading) return null;

  function onSubmit(values) {
    if (values.certificate.length > 0) {
      const fileType = values.certificate[0].type.split('/')[1];
      if (!allowedFileTypes.includes(fileType)) {
        toast.error(
          'Selected file type not allowed.Can either be a PDF,JPEG,JPG or PNG'
        );
        return;
      }
      if (values.certificate[0].size > 2000000) {
        toast.error('Selected file exceeds allowed limit of 2MB');
        return;
      }
    }
    upload(values, {
      onSuccess: () => {
        navigate('/');
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  }

  return (
    <main className="h-dvh flex items-center justify-center mx-4 :md:mx-0">
      <Card className="max-w-lg w-full ">
        <CardHeader>
          <CardTitle>Leader Verification</CardTitle>
          <CardDescription>
            You have chosen to sign up as a leader, as such we will need to
            verify this. Please upload the relevant certificates required as
            below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              label="Position"
              id="position"
              error={errors?.position?.message}
            >
              <Select
                options={options}
                variant={errors?.position ? 'destructive' : 'default'}
                id="position"
                placeholder="Select your position..."
                {...register('position', {
                  required: { value: true, message: 'Position is required' },
                })}
              />
            </FormControl>
            <FormControl
              label="County"
              id="county"
              error={errors?.county?.message}
            >
              <Select
                options={countyOptions}
                id="county"
                variant={errors?.county ? 'destructive' : 'default'}
                placeholder="Select your county..."
                {...register('county', {
                  required: { value: true, message: 'County is required' },
                })}
              />
            </FormControl>
            <FormControl
              label="Certificate"
              id="certificate"
              error={errors?.certificate?.message}
            >
              <Input
                id="certificate"
                variant={errors?.certificate ? 'destructive' : 'default'}
                type="file"
                {...register('certificate', {
                  required: { value: true, message: 'Certificate is required' },
                })}
              />
              <span className="block text-xs text-muted-foreground">
                PNG, JPG or PDF (MAX. 2MB)
              </span>
            </FormControl>
            <div>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <ButtonLoadingText loadingText="Uploading..." />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Verification;
