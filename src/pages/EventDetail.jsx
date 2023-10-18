import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Button from "../components/ui/Button";


function EventDetail() {
  const [confirmed,setConfirmed]=useState(false)
  const { id } = useParams();
  const eventId = parseInt(id); // Convert id to a number

  const [event, setEvent] = useState({});

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
    }
  ];

  useEffect(() => {
    // Check if eventId exists and is a valid number
    if (eventId && !isNaN(eventId)) {
      const clickedEvent = events.find(event => event.id === eventId);
  
      if (clickedEvent) {
        setEvent(clickedEvent);
      } else {
        setEvent({
          name: "Event not found",
          description: "The requested event does not exist.",
          county: ""
        });
      }
    }
  }, [eventId]);

  function handleConfirmation(){
    // handle confirmation logic to backend
    setConfirmed(true)
  }
  function fetchAllAttenders(){
    // fetch all people attending backend
    console.log(event)
  }

  return (
    <div>
      <div className="nav-buttons">
      <Button children={confirmed ?"Attendance confirmed":"Confirm attendance"} onClick={handleConfirmation}/>
      <Button children={"See attendees"} onclick={fetchAllAttenders}/>
      <Button children={"inquire about event"}/>
      </div>
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>{event.county}</p>
    </div>
    </div>
  );
}

export default EventDetail;
