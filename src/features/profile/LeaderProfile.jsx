import React from 'react'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import FormControl from '../../components/ui/FormControl'
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';


  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const positionOptions = [
    { value: 'senator', label: 'Senator' },
    { value: 'governor', label: 'Governor' },
    { value: "women's rep", label: "Women's Representative "},
    { value: 'mca', label: 'MCA' },
  ];


  const countyOptions = [
    {value: 'baringo', label:'Baringo County'},
    {value: 'bomet', label: 'Bomet County'},
    {value: 'busia', label: 'Busia County'},
    {value: 'bungoma', label: 'Bungoma County'},
    {value: 'embu', label: 'Embu County'},
    {value: 'elgeiyoMarakwet', label: 'Elgeyo: Marakwet County'},
    {value: 'homabay', label: 'Homa Bay County'},
    {value: 'garissa', label: 'Garissa County'},
    {value: 'kajiado', label: 'Kajiado County'},
    {value: 'isiolo', label: 'Isiolo County'},
    {value: 'kericho', label: 'Kericho County'},
    {value: 'kakamega', label: 'Kakamega County'},
    {value: 'kilifi', label: 'Kilifi County'},
    {value: 'kiambu', label: 'Kiambu County'},
    {value: 'kisii', label: 'Kisii County'},
    {value: 'kirinyaga', label: 'Kirinyaga County'},
    {value: 'kitui', label: 'Kitui County'},
    {value: 'kisumu', label: 'Kisumu County'},
    {value: 'laikipia', label: 'Laikipia County'},
    {value: 'kwale', label: 'Kwale County'},
    {value: 'machakos', label: 'Machakos County'},
    {value: 'lamu', label: 'Lamu County'},
    {value: 'mandera', label: 'Mandera County'},
    {value: 'makueni', label: 'Makueni County'},
    {value: 'migori', label: 'Migori County'},
    {value: 'meru', label: 'Meru County'},
    {value: 'mombasa', label: 'Mombasa County'},
    {value: 'marsabit', label: 'Marsabit County'},
    {value: 'nairobi', label: 'Nairobi County'},
    {value: 'muranga', label: 'Muranga County'},
    {value: 'nandi', label: 'Nandi County'},
    {value: 'nakuru', label: 'Nakuru County'},
    {value: 'nyamira', label: 'Nyamira County'},
    {value: 'narok', label: 'Narok County'},
    {value: 'nyeri', label: 'Nyeri County'},
    {value: 'nyandarua', label: 'Nyandarua County'},
    {value: 'siaya', label: 'Siaya County'},
    {value: 'samburu', label: 'Samburu County'},
    {value: 'tana river', label: 'Tana River County'},
    {value: 'taita taveta', label: 'Taita Taveta County'},
    {value: 'trans nzoia', label: 'Trans Nzoia County'},
    {value: 'turkana', label: 'Turkana County'},
    {value: 'tharaka nithi', label: 'Tharaka Nithi County'},
    {value: 'vihiga', label: 'Vihiga County'},
    {value: 'uasin gishu', label: 'Uasin Gishu County'},
    {value: 'west pokot', label: 'West Pokot County'},
    {value: 'wajir', label: 'Wajir County'},
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
          label="County"
          id="county" 
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