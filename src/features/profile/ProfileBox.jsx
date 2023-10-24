import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import Loader from '../../components/ui/Loader';
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup';
import { useUser } from '../authentication/use-user';
import Select from '../../components/ui/Select.jsx';
import { genderOptions, interestOptions, titleOptions } from './constants';
import { useCounties } from '../../hooks/use-counties';
import { useRole } from '../../hooks/use-role';
import Button from '../../components/ui/Button';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';
import { Separator } from '../../components/ui/Separator';
import { replaceEmptyStringsWithNull } from '../../lib/utils';
import { useUpdateProfile } from './use-update-profile';

const notificationInitialState = {
  displayed: false,
  variant: 'info',
  message: '',
};

function ProfileBox() {
  const { data } = useUser();
  const [notification, setNotification] = useState(notificationInitialState);
  const { isLoading, counties } = useCounties();
  const [interests, setInterests] = useState([]);
  const [titles, setTitles] = useState([]);
  const { isUpdating, update } = useUpdateProfile();
  const role = useRole();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: data?.user?.full_name ?? '',
      email: data?.user?.email ?? '',
      username: data?.user?.username ?? '',
      contact: data?.user?.contact ?? '',
      gender: data?.user?.gender ?? '',
      date_of_birth: data?.user?.date_of_birth ?? '',
      location: data?.user?.location ?? '',
      county_id: data?.user?.county_id ?? '',
      national_id: data?.user?.national_id ?? '',
      profile_image: '',
      member_type: data?.user?.member_type ?? 'individual',
    },
  });

  if (isLoading) return <Loader type="spinner" size="md" />;
  if (!data) return null;
  const countyOptions = counties?.map(county => ({
    value: county.id,
    label: county.name,
  }));

  function resetNotification() {
    setNotification(notificationInitialState);
  }

  function onSubmit(values) {
    const formTitles = titles.map(title => title.value);
    const formInterests = interests.map(interest => interest.value);
    const formattedValues = replaceEmptyStringsWithNull(values);
    const formFields = {
      ...formattedValues,
      interests: formInterests,
      titles: formTitles,
    };
    if (role === 'leader') delete formFields.member_type;

    update(
      { values: formFields, id: data?.user?.id },
      {
        onSuccess: () => {
          setNotification({
            displayed: true,
            variant: 'success',
            message: 'Profile updated successfully',
          });
        },
        onError: error => {
          setNotification({
            displayed: true,
            variant: 'error',
            message: error.message,
          });
        },
      }
    );
  }

  return (
    <>
      {notification.displayed && (
        <Alert
          message={notification.message}
          variant={notification.variant}
          dismissable
          onClose={resetNotification}
          className="mx-4 md:mx-auto max-w-xl mb-6"
        />
      )}
      <form
        className="grid grid-cols-12 gap-x-2 gap-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          className="col-span-full lg:col-span-4"
          label="Full Name"
          id="full_name"
          error={errors?.full_name?.message}
        >
          <Input
            placeholder="full name"
            id="full_name"
            disabled={isUpdating}
            {...register('full_name', { required: 'Field is required' })}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-4"
          label="Contact"
          id="contact"
        >
          <Input
            placeholder="contact"
            {...register('contact')}
            disabled={isUpdating}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-4"
          label="Date Of Birth"
          id="dob"
        >
          <Input type="date" placeholder="dob" {...register('date_of_birth')} />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-4"
          label="Title"
          id="title"
        >
          <ReactSelect
            isMulti
            name="colors"
            options={titleOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setTitles}
            isDisabled={isUpdating}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-4"
          label="Title Description"
          id="title_description"
        >
          <Input
            placeholder="title description"
            size="large"
            disabled={isUpdating}
            {...register('title_description')}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-4"
          label="Gender"
          id="title"
        >
          <Select
            placeholder="select gender"
            size="large"
            options={genderOptions}
            disabled={isUpdating}
            {...register('gender')}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-4"
          label="Location"
          id="location"
        >
          <Input
            placeholder="Your area name"
            {...register('location')}
            disabled={isUpdating}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-4"
          label="County"
          id="county_id"
        >
          <Select
            placeholder="select county"
            options={countyOptions}
            disabled={isUpdating}
            {...register('county_id')}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-4"
          label="National ID"
          id="national_id"
        >
          <Input
            placeholder="Your national id"
            {...register('national_id')}
            disabled={isUpdating}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-6"
          label="Interests"
          id="interests"
        >
          <ReactSelect
            isMulti
            name="colors"
            options={interestOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setInterests}
            isDisabled={isUpdating}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-6"
          label="Profile Photo"
          id="profile_image"
        >
          <Input
            type="file"
            size="large"
            {...register('profile_image')}
            disabled={isUpdating}
          />
        </FormControl>
        {role && role === 'citizen' && (
          <FormControl className="col-span-full lg:col-span-6">
            <RadioGroup
              defaultValue={getValues('member_type') || 'individual'}
              {...register('member_type')}
              className="flex flex-col md:flex-row"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <label htmlFor="individual">Individual</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organization" id="organization" />
                <label htmlFor="organization">Organization</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <label htmlFor="group">Group</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="institution" id="institution" />
                <label htmlFor="institution">Institution</label>
              </div>
            </RadioGroup>
          </FormControl>
        )}
        <Separator className="col-span-full" />
        <FormControl
          className="col-span-full lg:col-span-6"
          label="Email"
          id="email"
          error={errors?.email?.message}
        >
          <Input
            type="email"
            placeholder="Your email"
            id="email"
            disabled={isUpdating}
            {...register('email', { required: 'Field is required' })}
          />
        </FormControl>
        <FormControl
          className="col-span-full lg:col-span-6"
          label="Username"
          id="username"
          disabled={isUpdating}
        >
          <Input
            placeholder="username"
            {...register('username', { required: 'Field is required' })}
          />
        </FormControl>

        <div className="col-span-12 flex flex-col md:flex-row gap-3">
          <Button
            type="submit"
            className="w-full md:w-max"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <ButtonLoadingText loadingText="Updating..." />
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </>
  );
}

export default ProfileBox;
