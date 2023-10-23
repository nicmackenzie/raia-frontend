import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Avatar from '../components/ui/Avatar';
import { getEvent } from '../services/events-api';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';
import { formatDate } from '../features/events/Event';
import userPlaceholder from '../assets/default-user.jpg';
import posterPlaceholder from '../assets/no-image.jpg';
import EventAttendee from '../features/events/EventAttendee';
import EventEnquiryForm from '../features/events/EventEnquiryForm';
import { useUser } from '../features/authentication/use-user';
import EventActions from '../features/events/EventActions';

function EventDetail() {
  const { id } = useParams();
  const { data } = useUser();
  const [event, setEvent] = useState({});
  const {
    isLoading,
    data: fetchedEvent,
    error,
  } = useQuery({
    queryFn: () => getEvent(id),
    queryKey: ['events', id],
  });

  useEffect(
    function () {
      setEvent(fetchedEvent);
    },
    [id, fetchedEvent]
  );

  if (isLoading) {
    <Loader type="spinner" size="md" />;
  }
  if (error) {
    <Alert message={error} variant="error" dismissable={false} />;
  }

  const isAttending = event?.event_attendees?.some(
    attendee => attendee.user.id === data?.user?.id
  );

  const eventIsPast =
    event?.date && new Date().getTime() > new Date(event?.date).getTime();

  return (
    <article className="pb-6">
      <img
        src={event?.poster_url || posterPlaceholder}
        alt={`Poster for ${event?.name}`}
        className="block w-full aspect-video"
      />
      <div className="my-4">
        <h1 className="text-lg md:text-2xl font-bold text-tertiary dark:text-gold">
          {event?.name}
        </h1>
        <div className="my-4 flex flex-col lg:flex-row gap-4 lg:items-center">
          <div className="flex items-center gap-1 ">
            <Avatar src={event?.user?.profile_image || userPlaceholder} />
            <div className="text-sm lg:pr-4 lg:border-r">
              Hosted By:{' '}
              <span className="text-primary font-medium">
                {event?.user?.full_name}
              </span>
              <p className="text-xs text-muted-foreground">
                @{event?.user?.username}
              </p>
            </div>
          </div>
          <div className="lg:pl-4 flex flex-col lg:flex-row gap-2 lg:items-center">
            <div className="flex items-center gap-1 text-muted-foreground lg:pr-4 lg:border-r">
              <Calendar className="w-6 h-6" />
              <span className="text-xs md:text-sm">
                {formatDate(event?.date ? new Date(event?.date) : new Date())}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground lg:pl-4">
              <MapPin className="w-6 h-6" />
              <span className="text-xs md:text-sm">{event?.location}</span>
            </div>
          </div>
          <EventActions
            isOwner={event?.user?.id === data?.user?.id}
            isAttending={isAttending}
            eventId={event?.id}
            userId={data?.user?.id}
            eventIsPast={eventIsPast}
          />
        </div>
      </div>
      <div
        className="event-description max-w-2xl text-sm"
        dangerouslySetInnerHTML={{ __html: event?.description }}
      />
      <div className="max-w-2xl border rounded-md p-2">
        <div className="flex items-center justify-between mb-6">
          <h5 className="text-primary font-semibold">
            Attendees({event?.event_attendees?.length || 0})
          </h5>
          <Link
            to={`attendees`}
            className="text-sm text-blue-800 dark:text-blue-300 transition-all hover:underline"
          >
            See all
          </Link>
        </div>
        {event?.event_attendees?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5">
            {event?.event_attendees?.slice(0, 4).map(attendee => (
              <EventAttendee
                key={attendee.id}
                full_name={attendee?.user?.full_name}
                username={attendee?.user?.username}
                profile_image={attendee?.user?.profile_image}
                id={attendee?.user?.id}
                hostid={event?.user?.id}
              />
            ))}
            {event?.event_attendees?.length >= 10 && (
              <div className="flex flex-col items-center gap-1">
                <div className="h-16 w-16 rounded-full bg-secondary flex flex-col text-xs items-center justify-center uppercase text-secondary-foreground font-bold">
                  +{event?.event_attendees?.length - 4}
                  <span className="text-[10px]">others</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="block text-center text-sm text-muted-foreground">
            No attendees currently
          </p>
        )}
      </div>
      {event?.user?.id !== data?.user?.id && (
        <div className="mt-6">
          <EventEnquiryForm
            user_from={data?.user?.id}
            event={event?.id}
            event_user={event?.user?.id}
          />
        </div>
      )}
    </article>
  );
}

export default EventDetail;
