import { useState } from 'react';
import { Calendar } from '../../components/ui/Calendar';
import { useRole } from '../../hooks/use-role';
import { buttonVariants } from '../../components/ui/Button';

import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

function EventsBox() {
  const [date, setDate] = useState([new Date('2023-10-16'), new Date()]);
  const role = useRole();

  return (
    <div className="flex flex-col-reverse justify-center md:justify-start md:flex-row gap-4 md:gap-6">
      <div className="flex-1 rounded-sm">
        <h2 className="font-medium text-base md:text-lg ">Upcoming Events</h2>
      </div>
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={() => alert('asd')}
          className="rounded-md border w-max flex-shrink-0"
        />

        <Link
          className={cn(
            buttonVariants({ variant: 'default', size: 'sm' }),
            'w-full'
          )}
          to="new"
        >
          Add Event
        </Link>
      </div>
    </div>
  );
}

export default EventsBox;
