import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

function NavItem({ label, path, icon: Icon }) {
  const { pathname } = useLocation();

  return (
    <li
      className={cn(
        'block px-4 py-2 rounded-lg',
        pathname === path
          ? 'bg-primary/10 text-primary'
          : 'bg-secondary hover:bg-primary/10 hover:text-primary'
      )}
    >
      <Link to={path} className="w-full flex items-center gap-4">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-semibold">{label}</span>
      </Link>
    </li>
  );
}

export default NavItem;
