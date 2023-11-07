import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import Button, { buttonVariants } from '../ui/Button';
import Input from '../ui/Input';
import { useTheme } from '../../context/theme-provider';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
// import { useNotifications } from '../../context/notifications-context';

function LeaderNavBar({ onOpen }) {
  const { setTheme, theme } = useTheme();
  // const { unread } = useNotifications();

  // const unread = notifications
  //   ? notifications.filter(notification => notification.status === 'unread]')
  //       .length
  //   : 0;
  // console.log(count);

  function handleThemeToogle() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <header className="h-16 bg-secondary border-b flex items-center px-2">
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        aria-label="menu"
        onClick={onOpen}
      >
        <Menu aria-hidden />
      </Button>
      <form>
        <Input
          size="small"
          placeholder="Search..."
          className="hidden md:inline-flex w-96 bg-transparent dark:border-slate-600"
        />
      </form>
      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden w-8 h-8 p-0"
          aria-label="search"
        >
          <Search aria-hidden className="w-4 h-4 text-primary" />
        </Button>
        <Link
          to="/notifications"
          aria-label="notifications"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'w-8 h-8 p-0 relative'
          )}
        >
          <Bell aria-hidden className="w-4 h-4 text-primary" />
          {/* {unread > 0 && (
            <NotificationCount
              className="absolute -top-0.5 right-1"
              count={unread}
            />
          )} */}
        </Link>
        {/* <Button
          variant="ghost"
          size="sm"
          aria-label="notifications"
          className="w-8 h-8 p-0"
        >
          <Bell aria-hidden className="w-4 h-4 text-primary" />
        </Button> */}
        <Button
          variant="ghost"
          size="sm"
          aria-label="theme"
          className="w-8 h-8 p-0"
          onClick={handleThemeToogle}
        >
          {theme === 'dark' ? (
            <Sun aria-hidden className="w-4 h-4 text-primary" />
          ) : (
            <Moon aria-hidden className="w-4 h-4 text-primary" />
          )}
        </Button>
      </div>
    </header>
  );
}

export function NotificationCount({ count, className }) {
  return (
    <span
      className={cn(
        'w-4 h-4 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center',
        className
      )}
    >
      {count}
    </span>
  );
}

export default LeaderNavBar;
