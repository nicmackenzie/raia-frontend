import { Link } from 'react-router-dom';
import fallBack from '../../assets/default-user.jpg';
import { LogOut, Settings } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useUser } from '../../features/authentication/use-user';
import NavItem from './NavItem';
import { NAVITEMS } from './constants';
import Button from '../ui/Button';
import { useLogout } from './use-logout';

function LeaderSideBar() {
  const { data } = useUser();
  const { isLoggingOut, logout } = useLogout();
  return (
    <aside className="hidden w-72 h-full lg:flex lg:flex-col gap-6 lg:fixed md:fixed md:inset-y-0 z-[80] bg-background border-r pb-6">
      <div className="h-16 flex items-center px-4 lg:px-6 2xl:px-8">
        <div className="flex items-center gap-1">
          <Avatar size="sm" src={data?.user_metadata?.avatar_url || fallBack} />
          <div>
            <p className="text-xs font-semibold">
              {data?.user_metadata?.fullName}
            </p>
            <p className="text-[10px] text-muted-foreground">{data?.email}</p>
          </div>
        </div>
      </div>
      <nav>
        <ul className="px-4 space-y-2">
          {NAVITEMS.map(item => (
            <NavItem key={item.label} {...item} />
          ))}
        </ul>
      </nav>
      <div className="px-4 space-y-2 mt-auto">
        <Link
          to="/my-profile"
          className="px-4 py-1 rounded-lg flex items-center gap-4"
        >
          <Settings className="w-4 h-4" />
          <span className="text-xs font-semibold">Settings</span>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="px-4 py-1 rounded-lg flex items-center gap-4 w-full justify-start"
          disabled={isLoggingOut}
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />{' '}
          <span className="text-xs font-semibold">Logout</span>{' '}
        </Button>
      </div>
    </aside>
  );
}

export default LeaderSideBar;
