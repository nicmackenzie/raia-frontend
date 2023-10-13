import Button from "../components/ui/Button";
import Calendar from 'react-calendar';
import { useState } from "react";
import 'react-calendar/dist/Calendar.css'
import '../index.css'

function Events() {
  const [tgl,setTgl] = useState(new Date())
  const dates = ['14-10-2023','15-10-2023','16-10-2023','17-10-2023']
  console.log(tgl)
  return <div>
    <div>
      {/* <button className="button">Create event</button> */}
      <Button children={"Create Event"}/>
    </div>
    <Calendar
        // className='w-96 h-64 rounded-xl mb-6 bg-blue-300 react-calendar'
        onChange={setTgl}
        value={tgl}
        tileClassName={({date})=>{
          const currentDate = date.toISOString().split('T')[0] // Get the current date

          const highlighted = dates.some((day) => {
            const [dayString, monthString, yearString] = day.split('-');
            const dateObject = new Date(`${yearString}-${monthString}-${dayString}`);
            return currentDate === dateObject.toISOString().split('T')[0];
          });

          return highlighted? 'highlight':''
        }
      }
        />
  </div>
}

export default Events;
