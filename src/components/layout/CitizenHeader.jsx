import { Menu, Transition } from '@headlessui/react';
import darkLogo from '../../assets/logos/raia-final-white.png';
import lightLogo from '../../assets/logos/raia-final-purple.png';
import { useTheme } from '../../context/theme-provider';
import { useUser } from '../../features/authentication/use-user';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { BadgeHelp, LogOut, Moon, Search, Sun } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { cn, getInitials } from '../../lib/utils';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from './constants';
import { useLogout } from './use-logout';

function CitizenHeader() {
  const { theme, setTheme } = useTheme();
  const { logout } = useLogout();
  const { data } = useUser();
  const src = theme === 'light' ? lightLogo : darkLogo;
  function handleThemeToogle() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  return (
    <header className="h-16 px-6 bg-background border-b flex items-center justify-between ">
      <img src={src} alt="Raia Logo?" className="h-12 w-auto" />
      <form className="hidden lg:inline-flex">
        <Input placeholder="Search..." size="small" className="w-96" />
      </form>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden w-8 h-8 p-0"
          aria-label="search"
        >
          <Search aria-hidden className="w-4 h-4 text-primary" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label="notifications"
          className="w-8 h-8 p-0"
          onClick={handleThemeToogle}
        >
          {theme === 'dark' ? (
            <Sun aria-hidden className="w-4 h-4 text-primary" />
          ) : (
            <Moon aria-hidden className="w-4 h-4 text-primary" />
          )}
        </Button>
        <Menu as="div" className="relative inline-block">
          <Menu.Button>
            <Avatar
              size="sm"
              src={data?.user_metadata?.avatar_url}
              fallBack={getInitials(data?.user_metadata?.fullName)}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-background dark:bg-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-3 py-2">
                <Menu.Item>
                  <div className="text-sm font-semibold flex items-center justify-between">
                    <div> {data?.user_metadata?.fullName}</div>
                    <span className="text-gold">1.2Kpts</span>
                  </div>
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                {MENU_ITEMS.map(item => (
                  <Menu.Item key={item.label}>
                    {({ active }) => (
                      <Link
                        to={item.path}
                        className={cn(
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium gap-3',
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-info-foreground'
                        )}
                      >
                        <item.icon className="w-4 h-4" aria-hidden />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/support"
                      className={cn(
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium gap-3',
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-info-foreground'
                      )}
                    >
                      <BadgeHelp className="w-4 h-4" aria-hidden />
                      <span>Support</span>
                    </Link>
                  )}
                </Menu.Item>
              </div>
              <div className="p-1" onClick={logout}>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      role="button"
                      className={cn(
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium gap-3 cursor-pointer',
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-info-foreground'
                      )}
                    >
                      <LogOut className="w-4 h-4" aria-hidden />
                      <span>Logout</span>
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}

export default CitizenHeader;
