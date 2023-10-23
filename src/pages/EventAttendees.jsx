import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getEventAttendees } from '../services/events-api';
import { useEffect, useState } from 'react';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';
import EventAttendee from '../features/events/EventAttendee';
function EventAttendees() {
  const { id } = useParams();
  const [eventAttendees, setEventAttendees] = useState([]);
  const { isLoading, data, error } = useQuery({
    queryFn: () => getEventAttendees(id),
    queryKey: ['event-attendees', id],
  });

  useEffect(
    function () {
      setEventAttendees(data?.attendees);
    },
    [id, data]
  );

  if (isLoading) {
    return <Loader type="spinner" size="md" />;
  }

  if (error) {
    return <Alert message={error} variant="error" dismissable={false} />;
  }
  return (
    <>
      <h1 className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8">
        Attendees for{' '}
        <span className="text-tertiary font-semibold">{data?.event_name}</span>
      </h1>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {eventAttendees.length > 0 &&
          eventAttendees.map(attendee => (
            <EventAttendee
              key={attendee.id}
              full_name={attendee?.user?.full_name}
              username={attendee?.user?.username}
              profile_image={attendee?.user?.profile_image}
              id={attendee?.user?.id}
              hostid={data?.host}
            />
          ))}
      </div>
    </>
  );
}

export default EventAttendees;
