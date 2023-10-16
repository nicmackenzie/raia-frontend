import Button from "../components/ui/Button";
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'react-calendar/dist/Calendar.css'
import '../index.css'
import { Key } from "lucide-react";

function Events() {
  const [tgl,setTgl] = useState(new Date())
  const [showEventDetails,setShowEventDetails]=useState(false)
  const [event,setEvent]=useState([])
  const [createEvent,setCreateEvent] = useState(false)
  const navigate = useNavigate()
const events = [
  {
    "id": 1,
    "name": "Community Cleanup Day",
    "description": "Join us for a day of cleaning up the local park and making our community a cleaner and more beautiful place.",
    "date": '18-10-2023',
    "county": "Los Angeles"
  },
  {
    "id": 2,
    "name": "Food Drive for the Homeless",
    "description": "Help us collect non-perishable food items for the homeless population in our city. Every little bit helps!",
    "date": '19-10-2023',
    "county": "New York"
  },
  {
    "id": 3,
    "name": "Tech Workshop for Beginners",
    "description": "Learn the basics of programming and get hands-on experience with different technologies. No prior experience required!",
    "date": '16-10-2023',
    "county": "San Francisco"
  },
  {
    "id":4,
    "name":"Leaders forum",
    "description":"All leaders from chief level to governor level come to discuss current policies",
    "date":'16-10-2023',
    "county":"Kiambu"
  }
]

  // console.log(tgl)
  function handleEventClick(detail){
 navigate(`${detail.id}`)
  console.log(detail.id)
}
function handleCreateEvent(){
  setCreateEvent(true)
}
function handleDateClick(date) {
  console.log(date);

  const eventsForDate = events.filter(day => {
      const [dayString, monthString, yearString] = day.date.split('-');
      const dateObject = new Date(`${yearString}-${monthString}-${dayString}`);
      const formattedDate = dateObject.toLocaleDateString('en-GB'); // Format as 'dd-mm-yyyy'
      return date.toLocaleDateString('en-GB') === formattedDate;
  });

  if (eventsForDate.length > 0) {
      setEvent(eventsForDate);
      setShowEventDetails(true);
  } else {
      setEvent(["There is no event on this day"]);
      setShowEventDetails(true);
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
  showEventDetails && event.map((detail)=>{ 
return <div className="event-card" key={detail.id} onClick={()=>handleEventClick(detail)}>
    <h3><u>Upcoming event</u></h3>
    <p>{detail.name}</p>
    <p>{detail.description}</p>
  </div>
  }) 
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
