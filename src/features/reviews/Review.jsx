import Avatar from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import StarRating from '../../components/ui/StarRating';
import { ratingBadgeVariants } from '../../lib/utils';

function Review({ content, rating, reviewer }) {
  return (
    <div className="bg-background shadow-md w-full rounded-lg p-4 flex flex-col gap-6 md:gap-8 md:flex-row md:items-center">
      <div className="flex items-center gap-1.5">
        <Avatar
          src={reviewer.profile_image}
          alt={`avatar for ${reviewer.full_name}`}
          size="lg"
        />
        <div>
          <div className="text-sm font-semibold">{reviewer.full_name}</div>
          <span className="text-xs text-muted-foreground block -my-1">
            @{reviewer.username}
          </span>
          <Badge size="sm" className="text-[8px]">
            PIONEER
          </Badge>
        </div>
      </div>
      <p className="text-xs text-muted-foreground max-w-xl">{content}</p>
      <div className="md:ml-auto">
        <StarRating defaultRating={rating} />
        <Badge size="sm" variant={ratingBadgeVariants(rating).variant}>
          {ratingBadgeVariants(rating).comment}
        </Badge>
      </div>
    </div>
  );
}

export default Review;
