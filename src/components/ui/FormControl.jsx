import { cn } from '../../lib/utils';

function FormControl({ label, id, children, error, className }) {
  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default FormControl;
