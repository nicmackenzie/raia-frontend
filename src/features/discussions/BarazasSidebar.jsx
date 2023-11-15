import { useSearchParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { ScrollArea } from '../../components/ui/ScrollArea';
import { Separator } from '../../components/ui/Separator';
import { cn } from '../../lib/utils';

function BarazasSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'details';

  function handleTabChange(e) {
    searchParams.set('tab', e.target.textContent.trim().toLowerCase());

    setSearchParams(searchParams);
  }

  return (
    <div className="h-full fixed w-80 border-r">
      <ScrollArea className="px-4 py-2">
        <div className="space-y-2">
          <Button
            className={cn(
              'w-full transition-colors hover:bg-primary/10 hover:text-primary',
              activeTab === 'details' && 'bg-primary/10 text-primary'
            )}
            variant="secondary"
            onClick={e => handleTabChange(e)}
          >
            Details
          </Button>
          <Button
            className={cn(
              'w-full transition-colors hover:bg-primary/10 hover:text-primary',
              activeTab === 'conversations' && 'bg-primary/10 text-primary'
            )}
            variant="secondary"
            onClick={handleTabChange}
          >
            Conversations
          </Button>
          <Button
            className={cn(
              'w-full transition-colors hover:bg-primary/10 hover:text-primary',
              activeTab === 'activities' && 'bg-primary/10 text-primary'
            )}
            variant="secondary"
            onClick={handleTabChange}
          >
            Activities
          </Button>
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        <div>
          <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
            Members Present
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}

export default BarazasSidebar;
