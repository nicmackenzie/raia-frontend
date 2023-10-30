import { cn } from '../../lib/utils';
import { LogOut, Settings, X } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import purpleLogo from '../../assets/logos/raia-final-purple.png';
import Button from '../ui/Button';
import { NAVITEMS } from './constants';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';
import { useLogout } from './use-logout';

function MobileNavLeader({ isSidebarOpen, onClose }) {
  const ref = useOutsideClick(onClose);
  const { isLoggingOut, logout } = useLogout();
  return (
    <aside
      className={cn(
        'md:hidden fixed top-0 bg-secondary shadow-md left-0 h-screen w-4/5 z-50 transition-transform px-3 py-3 flex flex-col gap-8',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}
      ref={ref}
    >
      <header className="flex items-center justify-between">
        <img src={purpleLogo} alt="Raia ECI Logo" className="h-12" />
        <Button size="sm" variant="ghost" onClick={onClose}>
          <X />
        </Button>
      </header>
      <nav>
        <ul className="space-y-2">
          {NAVITEMS.map(item => (
            <NavItem key={item.label} {...item} onClose={onClose} />
          ))}
        </ul>
      </nav>
      <div className="space-y-2 mt-auto">
        <Link
          to="/my-profile"
          className="px-4 py-1 rounded-lg flex items-center gap-4"
          onClick={onClose}
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

export default MobileNavLeader;
