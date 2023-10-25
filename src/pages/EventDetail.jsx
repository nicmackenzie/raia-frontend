import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Button from "../components/ui/Button";



function EventDetail() {
  const [confirmed,setConfirmed]=useState(false)
  const { id } = useParams();
  const eventId = parseInt(id); // Convert id to a number
  const [users,setUsers]=useState([])
  const [inquiry,setInquiry]=useState("")
  const [seeAttendees,setSeeAttendees]=useState(false)
  const [event, setEvent] = useState({});
  const usersInfo = [{
    id:1,
    name: 'Jane Smith',
    age: 25,
    email: 'jane.smith@example.com',
    address: '456 Oak Ave, Townsville, USA',
  },
{
  id:2,
  name: 'James Brown',
    age: 40,
    email: 'james.brown@example.com',
    address: '789 Maple Ln, Villageton, USA',
},{
  id:3,
  name: 'Jill Johnson',
  age: 35,
  email: 'jill.johnson@example.com',
  address: '101 Pine Rd, Hilltop, USA',
}]
  
  
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
    const eventDetail={
      user_id:1,
      eventId:id,
      is_attending:true
    }
    fetch(" http://localhost:3000/event_details",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(eventDetail)
    }).then(res=>{
      if(res.ok){
        setConfirmed(true)
      }
      res.json()})
    .then(data=>console.log(data))
    
  }
  function fetchAllAttenders(){
    // fetch all people attending backend
    // setSeeAttendees(true)
    // setUsers(usersInfo)
    fetch(`http://localhost:3000/event_details/${id}`)
    .then(res=>res.json())
    .then(data=>setUsers(data))
  }
  function handleInquiry(e){
    console.log(e.target.name)
    setInquiry(()=>e.target.value)
  }
  
  function handleSubmitInquiry(e){
    const question = {
      inquiry:inquiry
    }
    e.preventDefault()
    fetch(`http://localhost:3000/event_details`,{
      method:'POST',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(question)
    })
    .then(res=>res.json())
    .then(data=>setUsers(data))
  }

  return (
    <div>
      <div className="nav-buttons">
      <Button children={confirmed ?"Attendance confirmed":"Confirm attendance"} onClick={handleConfirmation}/>
      <Button children={"See attendees"} onClick={fetchAllAttenders}/>
      </div>
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>{event.county}</p>
    </div>
   
     <form onSubmit={handleSubmitInquiry} className="event-form" >
      <label htmlFor="inquiry">Ask about event here:</label>
      <textarea name="inquiry" type="text" onChange={handleInquiry} value={inquiry}></textarea>
    <Button children={"send inquiry"} type="submit"/>
    </form>
    {seeAttendees && users.length>0 && users.map((user)=>{
      return <div className="user-cards" key={user.id}>
        <p>name: {user.name}</p>
        <p>email: {user.email}</p>
      </div>
    })}
    {
      seeAttendees && users.length===0 && <div className="user-cards">
        <p>No users have confirmed yet</p>
      </div>
    }
    
    </div>
  );
}

export default EventDetail;
