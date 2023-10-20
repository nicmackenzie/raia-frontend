import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar } from '../../components/ui/Calendar';
import { useRole } from '../../hooks/use-role';
import { buttonVariants } from '../../components/ui/Button';

import { cn } from '../../lib/utils';
import { useEvents } from './use-events';
import Alert from '../../components/ui/Alert';
import Event from './Event';

function EventsBox() {
  const { isLoading, error, events } = useEvents();
  const [eventDates, setEventDates] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const role = useRole();

  useEffect(
    function () {
      if (events && events.length > 0) {
        const eventDates = events.map(event => new Date(event.date));
        setEventDates(eventDates);
      }
    },
    [events]
  );

  if (error) {
    <Alert message={error} variant="error" dismissable={false} />;
  }

  function handleMonthNavigation(date) {
    searchParams.set('first-day', format(new Date(date), 'yyyy-MM-dd'));
    setSearchParams(searchParams);
  }

  function handleSelectedDay(date) {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    const filteredEvents = events?.filter(
      event => format(new Date(event.date), 'yyyy-MM-dd') === formattedDate
    );
    setDayEvents(filteredEvents);
  }

  return (
    <div className="flex flex-col-reverse justify-center lg:justify-start lg:flex-row gap-4 lg:gap-6">
      <div className="flex-1 rounded-sm border self-start p-4 ">
        <h2 className="font-medium text-base md:text-lg mb-6">
          Upcoming Events
        </h2>
        {isLoading && <LoadingComponent />}
        {dayEvents.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No events found for selected date
          </p>
        ) : (
          <div className="space-y-4">
            {dayEvents.map(event => (
              <Event key={event.id} {...event} />
            ))}
          </div>
        )}
      </div>
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={eventDates}
          // onSelect={setSelectedDay}
          onDayClick={e => handleSelectedDay(e)}
          onMonthChange={handleMonthNavigation}
          className="rounded-md border w-max flex-shrink-0"
        />

        {role === 'leader' && (
          <Link
            className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
            to="new"
          >
            Add Event
          </Link>
        )}
      </div>
    </div>
  );
}

function LoadingComponent() {
  <div className="flex justify-center mt-8">
    <Loader className="text-primary animate-spin" />
  </div>;
}
export default EventsBox;
