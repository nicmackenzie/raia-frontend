import { cn } from '../../lib/utils';

function TicketStatCard({ number, title, icon: Icon, className }) {
  return (
    <div
      className={cn(
        'border rounded-md py-2 bg-backgrgound shadow-md px-4 border-l-4 ',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-xl md:text-3xl font-bold">{number || 0}</div>
          <h5 className="text-sm lg:text-base text-tertiary font-semibold">
            {title}
          </h5>
        </div>
        <Icon className="text-muted-foreground/20 w-8 h-8" />
      </div>
    </div>
  );
}

export default TicketStatCard;
