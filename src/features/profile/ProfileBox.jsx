import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup';
import { useUser } from '../authentication/use-user';
import Select from '../../components/ui/Select.jsx';
import { genderOptions, interestOptions, titleOptions } from './constants';
import { useCounties } from '../../hooks/use-counties';
import { useRole } from '../../hooks/use-role';
import Button from '../../components/ui/Button';
import { Separator } from '../../components/ui/Separator';

function ProfileBox() {
  const { data } = useUser();
  const { isLoading, counties } = useCounties();
  const role = useRole();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: data?.user?.full_name ?? '',
      email: data?.user?.email ?? '',
      username: data?.user?.username ?? '',
      contact: data?.user?.contact ?? '',
      date_of_birth: data?.user?.date_of_birth ?? '',
      title: data?.user?.title ?? '',
      location: data?.user?.location ?? '',
      county_id: data?.user?.county_id ?? '',
      national_id: data?.user?.national_id ?? '',
      profile_image: '',
    },
  });

  if (isLoading) return <Loader type="spinner" size="md" />;
  if (!data) return null;
  const countyOptions = counties?.map(county => ({
    value: county.id,
    label: county.name,
  }));

  return (
    <form className="grid grid-cols-12 gap-x-2 gap-y-3">
      <FormControl
        className="col-span-full lg:col-span-4"
        label="Full Name"
        id="full_name"
        error={errors?.full_name?.message}
      >
        <Input
          placeholder="full name"
          id="full_name"
          {...register('full_name', { required: 'Field is required' })}
        />
      </FormControl>
      <FormControl
        className="col-span-full lg:col-span-4"
        label="Contact"
        id="contact"
      >
        <Input placeholder="contact" {...register('contact')} />
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
        <Select
          placeholder="select title"
          options={titleOptions}
          {...register('title')}
        />
      </FormControl>
      <FormControl
        className="col-span-full lg:col-span-4"
        label="Title Description"
        id="title_description"
      >
        <Input
          placeholder="title description"
          {...register('title_description')}
        />
      </FormControl>
      <FormControl
        className="col-span-full lg:col-span-4"
        label="Title"
        id="title"
      >
        <Select
          placeholder="select gender"
          options={genderOptions}
          {...register('title')}
        />
      </FormControl>
      <FormControl
        className="col-span-full lg:col-span-4"
        label="Location"
        id="location"
      >
        <Input placeholder="Your area name" {...register('location')} />
      </FormControl>
      <FormControl
        className="col-span-full lg:col-span-4"
        label="County"
        id="county_id"
      >
        <Select
          placeholder="select county"
          options={countyOptions}
          {...register('county_id')}
        />
      </FormControl>
      <FormControl
        className="col-span-full lg:col-span-4"
        label="National ID"
        id="national_id"
      >
        <Input placeholder="Your national id" {...register('national_id')} />
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
        />
      </FormControl>
      <FormControl
        className="col-span-full lg:col-span-6"
        label="Profile Photo"
        id="profile_image"
      >
        <Input type="file" size="large" {...register('profile_image')} />
      </FormControl>
      {role && role === 'citizen' && (
        <FormControl className="col-span-full lg:col-span-6">
          <RadioGroup
            defaultValue="individual"
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
          {...register('email', { required: 'Field is required' })}
        />
      </FormControl>
      <FormControl
        className="col-span-full lg:col-span-6"
        label="Username"
        id="username"
      >
        <Input placeholder="username" {...register('username')} />
      </FormControl>

      <div className="col-span-12 flex flex-col md:flex-row gap-3">
        <Button className="w-full md:w-max">Save Changes</Button>
      </div>
    </form>
  );
}

export default ProfileBox;
