import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

function Avatar({ src, fallBack, alt, className, size }) {
  const avatarVariants = cva('rounded-full', {
    variants: {
      size: {
        sm: 'h-10 w-10',
        default: 'h-12 w-12',
        lg: 'h-14 w-14',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  });

  const fallBackVariants = cva(
    'rounded-full bg-secondary flex items-center justify-center uppercase text-secondary-foreground font-bold',
    {
      variants: {
        size: {
          sm: 'h-10 w-10',
          default: 'h-12 w-12',
          lg: 'h-14 w-14',
          xl: 'h-16 w-16',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  );

  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'user avatar'}
        className={cn(avatarVariants({ size, className }))}
      />
    );
  }
  if (!src) {
    return (
      <div className={cn(fallBackVariants({ size, className }))}>
        {fallBack}
      </div>
    );
  }
}

export default Avatar;
