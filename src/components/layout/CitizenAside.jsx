import NavItem from './NavItem';
import { CITIZEN_NAVITEMS } from './constants';

function CitizenAside() {
  return (
    <aside className="hidden md:inline-flex  w-60 bg-background rounded-lg pt-4">
      <nav className="w-full">
        <ul className="px-4 space-y-2">
          {CITIZEN_NAVITEMS.map(item => (
            <NavItem key={item.label} {...item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default CitizenAside;
