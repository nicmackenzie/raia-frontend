import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

function CitizenFooter({ icon: Icon, path }) {
  const { pathname } = useLocation();
  const constructedPath = `/${pathname.split('/').at(1)}`;

  return (
    <li
      className={cn(
        'text-xs ',
        constructedPath === path ? 'text-primary/80 font-semibold' : ''
      )}
    >
      <Link
        className="flex flex-col gap-2 justify-center items-center"
        to={path}
      >
        <Icon />
        {/* <span className="text-xs inline-block">{label}</span> */}
      </Link>
    </li>
  );
}

export default CitizenFooter;
