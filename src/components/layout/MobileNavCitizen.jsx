import { useOutsideClick } from '../../hooks/use-outside-click';
import { X } from 'lucide-react';
import purpleLogo from '../../assets/logos/raia-final-purple.png';
import Button from '../ui/Button';
import { CITIZEN_NAVITEMS, CITIZEN_NAV_FOOTER } from './constants';
import NavItem from './NavItem';
import { cn } from '../../lib/utils';

const forMobile = CITIZEN_NAV_FOOTER.map(item => item.path);
const notForMobile = CITIZEN_NAVITEMS.filter(
  item => !forMobile.includes(item.path)
);

function MobileNavLeader({ isSidebarOpen, onClose }) {
  const ref = useOutsideClick(onClose);
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
          {notForMobile.map(item => (
            <NavItem key={item.label} {...item} onClose={onClose} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default MobileNavLeader;
