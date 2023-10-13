import Button from "../components/ui/Button";
import Calendar from 'react-calendar';
import { useState } from "react";
import 'react-calendar/dist/Calendar.css'
import '../index.css'

function Events() {
  const [tgl,setTgl] = useState(new Date())
  const [showEventDetails,setShowEventDetails]=useState(<i className="fab fa-bullseye-pointer"></i>)
const events = [
  { date: '18-10-2023', event: 'Event A' },
  { date: '19-10-2023', event: 'Event B' },
  { date: '16-10-2023', event: 'Event C' },
  { date: '17-10-2023', event: 'Event D' },
  { date: '10-10-2023', event: 'Event E' },
  // Add more events as needed
];
  // console.log(tgl)
  function handleDateClick(date){
    console.log(date)
    const isHighlighted =  events.some((day) => {
      const [dayString, monthString, yearString] = day.date.split('-');
      const dateObject = new Date(`${yearString}-${monthString}-${dayString}`);
      const formattedDate = dateObject.toLocaleDateString('en-GB'); // Format as 'dd-mm-yyyy'
      return date.toLocaleDateString('en-GB') === formattedDate;
    });
    if (isHighlighted){
      setShowEventDetails(true)
    }
  }
  return <div>
    <div>
      {/* <button className="button">Create event</button> */}
      <Button children={"Create Event"}/>
    </div>
    <Calendar
  // className='w-96 h-64 rounded-xl mb-6 bg-blue-300 react-calendar'
  onChange={setTgl}
  value={tgl}
  onClickDay={handleDateClick}
  tileClassName={({date}) => {
    const currentDate = date.toLocaleDateString('en-GB'); // Format as 'dd-mm-yyyy'

    const highlighted = events.some((day) => {
      const [dayString, monthString, yearString] = day.date.split('-');
      const dateObject = new Date(`${yearString}-${monthString}-${dayString}`);
      const formattedDate = dateObject.toLocaleDateString('en-GB'); // Format as 'dd-mm-yyyy'
      return currentDate === formattedDate;
    });

    return highlighted ? 'highlight' : '';
  }}
/>
  </div>
}

export default Events;
