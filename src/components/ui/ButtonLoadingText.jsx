import { Loader } from 'lucide-react';

function ButtonLoadingText({ loadingText }) {
  return (
    <div className="flex items-center gap-1">
      <Loader className="w-4 h-4 animate-spin" />{' '}
      <span>{loadingText || 'please wait...'}</span>
    </div>
  );
}

export default ButtonLoadingText;
