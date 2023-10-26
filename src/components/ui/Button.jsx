import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useMoveBack } from '../../hooks/use-move-back';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-8 px-2 py-1 text-xs p',
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  children,
  onClick,
  variant,
  size,
  className,
  type,
  ...props
}) {
  return (
    <button
      type={type || 'button'}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function BackButton() {
  const goBack = useMoveBack();
  return (
    <Button
      size="sm"
      variant="ghost"
      className="text-xs transition-all hover:text-primary"
      onClick={goBack}
    >
      <ChevronLeft className="w-4 h-4" />
      <span>&nbsp;Back</span>
    </Button>
  );
}

export default Button;
