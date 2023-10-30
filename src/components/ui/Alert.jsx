import { useEffect, useState } from 'react';
import { CheckSquare, Info, X, XCircle } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

function Alert({ message, variant, dismissable = true, className, onClose }) {
  const [closed, setClosed] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(message);

  function handleClose() {
    setClosed(true);
    setDisplayMessage('');
    onClose();
  }

  useEffect(
    function () {
      let timer;

      if (closed) {
        timer = setTimeout(() => {
          setClosed(false);
        }, 1000);
      }

      return () => clearTimeout(timer);
    },
    [closed]
  );

  const alertVariants = cva(
    'max-w-md py-2 px-4 mx-4 sm:mx-auto flex items-center justify-between rounded-lg',
    {
      variants: {
        variant: {
          info: 'bg-info/30 border border-info/30 text-slate-900 dark:text-slate-200',
          success:
            'bg-success/30 border border-success/30  text-green-900 dark:text-green-200',
          error:
            'bg-destructive/30 border border-destructive/30  text-red-900 dark:text-red-200',
          warning:
            'bg-warning/30 border border-warning/30  text-orange-900 dark:text-orange-200',
        },
      },
      defaultVariants: {
        variant: 'info',
      },
    }
  );

  if (closed) return null;

  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert">
      <p className="text-sm flex items-center gap-2 font-semibold">
        {variant === 'error' && <XCircle className="w-4 h-4" aria-hidden />}
        {variant === 'success' && (
          <CheckSquare className="w-4 h-4" aria-hidden />
        )}
        {variant === 'info' && <Info className="w-4 h-4" aria-hidden />}
        <span>{displayMessage}.</span>
      </p>
      {dismissable && (
        <button
          className="transition-transform hover:scale-110"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Alert;
