import { useSearchParams } from 'react-router-dom';
import Button from './Button';
import { cn } from '../../lib/utils';

export default function Filter({ options, filterKey, className, defaultTab }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab =
    searchParams.get(filterKey) || defaultTab || options.at(0)?.value;

  function handleClick(value) {
    searchParams.set(filterKey, value);
    if (searchParams.get('page')) searchParams.set('page', '1');
    setSearchParams(searchParams);
  }
  return (
    <div
      className={cn('p-1 border rounded flex gap-1 items-center', className)}
    >
      {options.map(option => (
        <Button
          key={option.value}
          size="sm"
          className={cn(
            'py-2',
            selectedTab === option.value
              ? 'bg-primary/10 text-primary hover:bg-primary/20'
              : 'bg-gray-50 dark:bg-gray-800 dark:text-gray-50  text-gray-800 hover:bg-primary/10 hover:text-primary dark:hover:bg-gray-900'
          )}
          //   {selectedTab === option.value ? 'secondary' : 'ghost'}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
