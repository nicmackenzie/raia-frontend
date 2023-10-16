import React from 'react'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import FormControl from '../../components/ui/FormControl'
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

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
  return (
    <div>
      <div className="flex justify-between space-x-3">
          <Button >My Profile</Button>
          <Button>change password</Button>
      </div>
      
      <form className='grid grid-cols-12 gap-6 bg-background px-6 pt-14 mt-14 pb-6 relative' >
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
            
          />
        </FormControl>
        
      </form>
    </div>
    
  )
}

export default CitizenProfile