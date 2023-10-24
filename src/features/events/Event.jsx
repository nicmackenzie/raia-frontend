import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import noImagePlaceHolder from '../../assets/no-image.jpg';

// eslint-disable-next-line react-refresh/only-export-components
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

function Event({ id, name, date, poster_url, location }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 lg:gap-4 border-b pb-2 last:pb-0 last:border-b-0">
      <img
        src={poster_url || noImagePlaceHolder}
        alt={`Event poster for ${name}`}
        className="col-span-12 lg:col-span-2 object-cover block rounded-md overflow-hidden aspect-video"
      />
      <div className="col-span-full lg:col-span-10 space-y-2">
        <Link
          to={`${id}`}
          className="transition-colors hover:underline hover:text-primary"
        >
          <h3 className="text-base lg:text-lg font-semibold">{name}</h3>
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 text-muted-foreground">
          <div className="flex items-center gap-1 lg:pr-2 lg:border-r">
            <Calendar className="w-4 h-4" />
            <p className="text-xs lg:text-sm">{formatDate(new Date(date))}</p>
          </div>
          <div className="flex items-center gap-1 lg:pl-2">
            <MapPin className="w-4 h-4" />
            <p className="text-xs lg:text-sm">{location}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Event;
