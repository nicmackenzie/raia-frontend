import RatingStatCard from './RatingStatCard';

function ReviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
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
  );
}

export default ReviewStats;
