import React from 'react'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import FormControl from '../../components/ui/FormControl'
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useCounties } from '../../hooks/use-counties';



  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const positionOptions = [
    { value: 'governor', label: 'Governor' },
    { value: 'senetaor', label: 'Senator' },
    { value: 'mp', label: 'Member Of Parliament(MP)' },
    { value: 'women-rep', label: 'Women Rep' },
    { value: 'mca', label: 'MCA' },
  ];


  

function CitizenProfile() {
  const { isLoading, counties } = useCounties();

  const countyOptions = counties?.map(county => ({
    value: county.id,
    label: county.name,
  }));
  console.log(countyOptions)

  if (isLoading) return null;

  return (
    <div>
      <div className="flex justify-between space-x-3">
          <Button 
          className='px-3 hover:bg-primary text-black hover:text-white'
          variant='outline'
          >My Profile</Button>
          <Button>change password</Button>
          {/* <Avatar src='https://i.pravatar.cc/48?u=123123'/> */}
      </div>
      <form className='grid grid-cols-6 gap-6 bg-background px-6 pt-14 mt-14 pb-6 relative '>
      <Avatar src='https://i.pravatar.cc/48?u=123123' className='absolute left-1/2 -translate-x-1/2 -top-6 ' size='lg'/>

      <FormControl 
          label="Full Name"
          id="fullName" 
          className='col-span-6 md:col-span-2'
        >
            <Input
            id="fullName"
            name='full_name'
            size="small"
            placeholder="Full Name"
            
          />
        </FormControl>
        <FormControl 
          label="County"
          id="county" 
          className='col-span-6 md:col-span-2'

        >
            <Select
              // variant={errors?.joiningAs ? 'destructive' : 'outline'}
              id="county"
              options={countyOptions}
              size="small"
              placeholder="Select your county" 
           />
        </FormControl>
        <FormControl
          label="Elected Position"
          id="position"
          className='col-span-6 md:col-span-2'

        >
            <Select
              // variant={errors?.joiningAs ? 'destructive' : 'outline'}
              id="position"
              options={positionOptions}
              size="small"
              placeholder="Select Position" 
           />
        </FormControl>
        
        <FormControl 
          label="Email"
          id="email" 
          className='col-span-6 md:col-span-2'

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
          
          className='col-span-6 md:col-span-2'

        >
            <Input
            id="contact"
            name='contact'
            size="small"
            placeholder="Contact"
            
          />
        </FormControl>
        <FormControl 
          label="Date of Birth"
          id="dateOfBirth" 
          className='col-span-6 md:col-span-2'

        >
            <Input
            id="dateOfBirth"
            name='date_of_birth'

            type="date"
            size="small"
            placeholder="Select date"
            
          />
        </FormControl><FormControl 
          label="Gender"
          id="gender" 
          className='col-span-6 md:col-span-2'

        >
            <Select
              // variant={errors?.joiningAs ? 'destructive' : 'outline'}
              id="gender"
              name='gender'
              options={genderOptions}
              size="small"
              placeholder="Select your Gender" 
           />
        </FormControl>
        <FormControl 
          label="National ID no"
          id="nationalId" 
          className='col-span-6 md:col-span-2'

        >
            <Input
            id="nationalId"
            name='national_id'
            size="small"
            placeholder="National ID number"
            
          />
        </FormControl>
        <FormControl 
          label="Address"
          id="address" 
          className='col=span-6 md:col-span-2'

        >
            <Input
            id="address"
            name='location'
            size="small"
            placeholder="Address"
            
          />
        </FormControl>
      </form>
    </div>
    
  )
}

export default CitizenProfile