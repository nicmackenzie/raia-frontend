import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

function NavItem({ label, path, icon: Icon, onClose }) {
  const { pathname } = useLocation();
  const constructedPath = `/${pathname.split('/').at(1)}`;

  return (
    <li
      className={cn(
        'block px-4 py-2 rounded-lg',
        constructedPath === path
          ? 'bg-primary/10 text-primary'
          : 'bg-secondary hover:bg-primary/10 hover:text-primary'
      )}
      onClick={onClose}
    >
      <Link to={path} className="w-full flex items-center gap-4">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-semibold">{label}</span>
      </Link>
    </li>
  );
}

export default NavItem;
