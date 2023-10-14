import Button from "../components/ui/Button";
import Calendar from 'react-calendar';
import { useState } from "react";
import 'react-calendar/dist/Calendar.css'
import '../index.css'

function Events() {
  const [tgl,setTgl] = useState(new Date())
  const [showEventDetails,setShowEventDetails]=useState(false)
  const [event,setEvent]=useState(null)
  const [createEvent,setCreateEvent] = useState(false)
const events = [
  { date: '18-10-2023', event: 'Event A' },
  { date: '19-10-2023', event: 'Event B' },
  { date: '16-10-2023', event: 'Event C' },
  { date: '17-10-2023', event: 'Event D' },
  { date: '10-10-2023', event: 'Event E' },
];
  // console.log(tgl)
  function handleEventClick(){
    console.log(event)
  }
function handleCreateEvent(){
  setCreateEvent(true)
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
      <Button children={"Create Event"} onClick={handleCreateEvent}/>
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
{
  createEvent && <form className="event-form">
    <label htmlFor="name">Enter event name:</label>
    <input name="name" type="text"></input>
    <label htmlFor="description">Enter event description:</label>
    <input name="description" type="text"></input>
    <label htmlFor="date">Enter date for event</label>
    <input name="date" type="date"></input>
    <label htmlFor="county">Enter specific county</label>
    <input name="county" type="text"></input>
    <button type="submit">Submit</button>
  </form>
}
  </div>
}

export default Events;
