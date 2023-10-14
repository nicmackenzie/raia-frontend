import Button from "../components/ui/Button";
import Calendar from 'react-calendar';
import { useState } from "react";
import 'react-calendar/dist/Calendar.css'
import '../index.css'

function Events() {
  const [tgl,setTgl] = useState(new Date())
  const [showEventDetails,setShowEventDetails]=useState(false)
  const [event,setEvent]=useState(null)
const events = [
  { date: '18-10-2023', event: 'Event A' },
  { date: '19-10-2023', event: 'Event B' },
  { date: '16-10-2023', event: 'Event C' },
  { date: '17-10-2023', event: 'Event D' },
  { date: '10-10-2023', event: 'Event E' },
  // Add more events as needed
];
  // console.log(tgl)
  function handleEventClick(){
    console.log(event)
  }
  function handleDateClick(date){
    console.log(date)
    const isHighlighted =  events.some((day) => {
      const [dayString, monthString, yearString] = day.date.split('-');
      const dateObject = new Date(`${yearString}-${monthString}-${dayString}`);
      const formattedDate = dateObject.toLocaleDateString('en-GB'); // Format as 'dd-mm-yyyy'
      if(date.toLocaleDateString('en-GB') === formattedDate){
        setEvent(day.event)
        return true
      }else{
        return false
      }
    });
    console.log(isHighlighted)
    if (isHighlighted){
      setShowEventDetails(true)
    }else{
      setEvent("There is no event on this day")
    }
  }
  return <div>
    <div>
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
{
  showEventDetails && <div className="event-card" onClick={handleEventClick}>
    <h3>Upcoming event</h3>
    {event}
  </div>
}
  </div>
}

export default Events;
