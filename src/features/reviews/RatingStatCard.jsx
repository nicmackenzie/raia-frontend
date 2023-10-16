import { Badge } from '../../components/ui/Badge';
import { numberFormatter } from '../../lib/utils';

function RatingStatCard({
  title,
  rating,
  totalReviews = 0,
  variant = 'default',
  remark,
}) {
  return (
    <div className="p-2 bg-card shadow rounded-md flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold mb-1">{title}</h3>
        <div className="flex items-center gap-1">
          <Badge size="sm" variant={variant}>
            {remark}
          </Badge>
          <p className="text-muted-foreground text-[10px] font-medium">
            {numberFormatter(totalReviews)} reviews
          </p>
        </div>
      </div>
      <div className="h-full aspect-square w-auto bg-primary/10 text-primary text-base md:text-lg font-bold flex items-center justify-center rounded-full">
        {rating}
      </div>
    </div>
  );
}

export default RatingStatCard;
