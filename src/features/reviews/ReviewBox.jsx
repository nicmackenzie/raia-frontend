import Select from '../../components/ui/Select';
import RatingStatCard from './RatingStatCard';

const CATEGORY_OPTIONS = [
  { value: 'governance', label: 'Governance' },
  { value: 'fund-utilization', label: 'Fund Utilization' },
  { value: 'development', label: 'Development' },
  { value: 'community-outreach', label: 'Community Outreach' },
];

function ReviewBox() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <RatingStatCard
          rating={3.5}
          title="Your Score"
          totalReviews={2000}
          variant="success"
          remark="Good"
        />
        <RatingStatCard
          rating={2}
          title="Goverance"
          totalReviews={1876}
          variant="destructive"
          remark="Poor"
        />
        <RatingStatCard
          rating={3}
          title="Fund utilization"
          totalReviews={3002}
          variant="warning"
          remark="Fair"
        />
        <RatingStatCard
          rating={3}
          title="Development"
          totalReviews={1767}
          variant="warning"
          remark="Fair"
        />
      </div>
      <div className="flex justify-end my-6 w-1/5">
        <Select placeholder="Filter by..." options={CATEGORY_OPTIONS} />
      </div>
    </>
  );
}

export default ReviewBox;
