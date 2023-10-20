import React from 'react'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import FormControl from '../../components/ui/FormControl'
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useUser } from '../authentication/use-user';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../../services/profile-api';
import { DevTool } from '@hookform/devtools';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';

const titleOptions = [
    { value: 'parent', label: 'Parent' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
    { value: 'entrepreneuer', label: 'Entrepreneuer' },
  ];
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    
  ];
  const interestOptions = [
    { value: 'finance', label: 'Finance' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
  ];

function CitizenProfile() {
  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateProfile,
  });

  const { isLoading: isFetching, data } = useUser();
  const userInfo = data?.user

  console.log(userInfo)
  if (isFetching) return null;


  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: userInfo?.full_name !== null ? userInfo.full_name : '',
      county: userInfo?.county !== null ? userInfo.county : '',
      interests: userInfo?.interests !== null ? userInfo.interests : '',
      date_of_birth: userInfo?.date_of_birth !== null ? userInfo.date_of_birth : '',
      contact:  userInfo?.contact !== null ? userInfo.contact : '',
      email: userInfo?.email !== null ? userInfo.email : '',
      gender: userInfo?.gender !== null ? userInfo.gender : '',
      national_id: userInfo?.national_id !== null ? userInfo.national_id : '',
      location: userInfo?.location !== null ? userInfo.location: '',
      profile_image: userInfo?.profile_image !== null ? userInfo.profile_image : '',
      
    },
  });

  const onSubmit = (values) => {
    // console.log('values submitted', values)
    const formValues = {...values, id: userInfo.id}
    console.log('values submitted', formValues)

    // update(formValues)
  }



  return (
    <div>
      <div className="flex justify-between space-x-3">
          <Button >My Profile</Button>
          <Button>change password</Button>
      </div>
      
      <form className='grid grid-cols-12 gap-6 bg-background px-6 pt-14 mt-14 pb-6 relative' onSubmit={handleSubmit(onSubmit)} >
        <Avatar src='https://i.pravatar.cc/48?u=123123' className='absolute left-1/2 -translate-x-1/2 -top-6 ' size='lg'/>
        <FormControl
          label="Title"
          id="title"
          className='col-span-12 md:col-span-4 '
        >
            <Select
              // variant={errors?.joiningAs ? 'destructive' : 'outline'}
              id="title"
              options={titleOptions}
              size="small"
              placeholder="Select Title" 
              
           />
        </FormControl>
        <FormControl 
          label="Full Name"
          id="fullName" 
          className='col-span-12 md:col-span-4 '

        >
            <Input
            id="fullName"
            size="small"
            placeholder="Full Name"
            {...register("full_name")}
            
          />
        </FormControl>
        <FormControl 
          label="Email"
          id="email" 
          className='col-span-12 md:col-span-4 '
          
        >
            <Input
            id="email"
            size="small"
            placeholder="Email"
            {...register("email")}
            
          />
        </FormControl>
        <FormControl 
          label="Contact"
          id="contact"
          className='col-span-12 md:col-span-4 '

        >
            <Input
            id="contact"
            size="small"
            placeholder="Contact"
            {...register("contact")}
            
          />
        </FormControl>
        <FormControl 
          label="Occupation"
          id="occupation" 
          className='col-span-12 md:col-span-4 '

        >
            <Input
            id="occupation"
            size="small"
            placeholder="Occupation"
            {...register("occupation")}
            
          />
        </FormControl>
        <FormControl 
          label="Date of Birth"
          id="dateOfBirth" 
          className='col-span-12 md:col-span-4 '

        >
            <Input
            id="dateOfBirth"
            type="date"
            size="small"
            placeholder="Select date"
            {...register("date_of_birth")}
            
          />
        </FormControl><FormControl 
          label="Gender"
          id="gender" 
          className='col-span-12 md:col-span-4 '

        >
            <Select
              // variant={errors?.joiningAs ? 'destructive' : 'outline'}
              id="gender"
              options={genderOptions}
              size="small"
              placeholder="Select your Gender" 
              {...register("gender")}
           />
        </FormControl>
        <FormControl 
          label="County"
          id="county" 
          className='col-span-12 md:col-span-4 '

        >
            <Input
            id="county"
            size="small"
            placeholder="Select your county"
            {...register("county")}
            
          />
        </FormControl>
        <FormControl 
          label="Interests"
          id="interests"
          className='col-span-12 md:col-span-4 '

        >
            <Select
              // variant={errors?.joiningAs ? 'destructive' : 'outline'}
              id="interests"
              options={interestOptions}
              size="small"
              placeholder="Select your Interests" 
              {...register("interests")}
           />
        </FormControl>
        <FormControl 
          label="National ID no"
          id="nationalId" 
          className='col-span-12 md:col-span-6'

        >
            <Input
            id="nationalId"
            size="small"
            placeholder="National ID number"
            {...register("national_id")}
            
            
          />
        </FormControl>
        <FormControl 
          label="Address"
          id="address" 
          className='col-span-12 md:col-span-6'

        >
            <Input
            id="address"
            size="small"
            placeholder="Address"
            {...register("location")}
            
          />
        </FormControl>
        <FormControl 
          label="Profile picture"
          id="picture" 
          className='col-span-12 md:col-span-6'

        >
            <Input
            id="picture"
            size="small"
            type='file'
            {...register("profile_image")}
            
          />
        </FormControl>
        <Button type="submit" disabled={isUpdating}>
                {isUpdating? (
                  <ButtonLoadingText loadingText="Updating..." />
                ) : (
                  'Save Changes'
                )}
              </Button>
        <Button>Cancel</Button>
        
      </form>
      <DevTool control={control}/>
    </div>
    
  )
}

export default CitizenProfile