import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useTheme } from '../../context/theme-provider';

function LeaderNavBar() {
  const { setTheme, theme } = useTheme();

  function handleThemeToogle() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <header className="h-16 bg-background border-b flex items-center px-2">
      <Button variant="ghost" size="sm" className="lg:hidden" aria-label="menu">
        <Menu aria-hidden />
      </Button>
      <form>
        <Input
          size="small"
          placeholder="Search..."
          className="hidden md:inline-flex w-96"
        />
      </form>
      <div className="ml-auto flex items-center gap-1">
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
        >
          <Bell aria-hidden className="w-4 h-4 text-primary" />
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
      </div>
    </header>
  );
}

export default LeaderNavBar;
