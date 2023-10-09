import darkLogo from '../../assets/logos/raia-final-white.png';
import lightLogo from '../../assets/logos/raia-final-purple.png';
import { useTheme } from '../../context/theme-provider';
import { useUser } from '../../features/authentication/use-user';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Moon, Search, Sun } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { getInitials } from '../../lib/utils';

function CitizenHeader() {
  const { theme, setTheme } = useTheme();
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
        <Avatar
          size="sm"
          src={data?.user_metadata?.avatar_url}
          fallBack={getInitials(data?.user_metadata?.fullName)}
        />
      </div>
    </header>
  );
}

export default CitizenHeader;
