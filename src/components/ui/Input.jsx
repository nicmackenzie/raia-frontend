import React from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const Input = React.forwardRef(
  ({ className, type, variant, size, ...props }, ref) => {
    const inputVariants = cva(
      'flex w-full rounded-md border bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      {
        variants: {
          variant: {
            default: 'border-input',
            destructive: 'border-destructive',
            outline: 'border-gray-400',
          },
          size: {
            small: 'h-8 py-1 px-3',
            default: 'h-9 px-3 py-2',
            large: 'h-10 px-4 py-2',
          },
        },
        defaultVariants: {
          variant: 'default',
          size: 'default',
        },
      }
    );
    return (
      <input
        type={type || 'text'}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
