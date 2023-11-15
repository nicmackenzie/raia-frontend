import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import NavItem from './NavItem';
import { CITIZEN_NAVITEMS } from './constants';
import { Bell } from 'lucide-react';
// import { NotificationCount } from './LeaderNavBar';
// import { useNotifications } from '../../context/notifications-context';

function CitizenAside() {
  const { pathname } = useLocation();
  // const { unread } = useNotifications();

  return (
    <aside className="hidden md:inline-flex  w-60 bg-secondary rounded-lg pt-4">
      <nav className="w-full">
        <ul className="px-4 space-y-2">
          {CITIZEN_NAVITEMS.map(item => (
            <NavItem key={item.label} {...item} />
          ))}
          <li
            className={cn(
              'block px-4 py-2 rounded-lg',
              pathname === '/notifications'
                ? 'bg-primary/10 text-primary'
                : 'bg-secondary hover:bg-primary/10 hover:text-primary'
            )}
          >
            <Link
              to="/notifications"
              className="w-full flex items-center gap-4"
            >
              <Bell className="w-4 h-4" />
              <span className="text-xs font-semibold">Notifications</span>
              {/* {unread > 0 && <NotificationCount count={unread} />} */}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default CitizenAside;
