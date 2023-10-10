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
      <div className="space-x-3">
          <Button >My Profile</Button>
          <Button>change passwordd</Button>
      </div>
      <div>
        <Avatar />
      </div>
      <form>
        <FormControl
          label="Title"
          id="title"
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
        >
            <Select
              // variant={errors?.joiningAs ? 'destructive' : 'outline'}
              id="gender"
              options={genderOptions}
              size="small"
              placeholder="Select your Gender" 
           />
        </FormControl><FormControl 
          label="County"
          id="county" 
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
        >
            <Input
            id="address"
            size="small"
            placeholder="Address"
            
          />
        </FormControl>
      </form>
    </div>
    
  )
}

export default CitizenProfile