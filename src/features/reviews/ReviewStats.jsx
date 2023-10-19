import RatingStatCard from './RatingStatCard';

function ReviewStats({ score, governance, utilization, development }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      <RatingStatCard
        rating={score.average}
        title="Your Score"
        totalReviews={score.count}
      />
      <RatingStatCard
        rating={governance.average}
        title="Goverance"
        totalReviews={governance.count}
      />
      <RatingStatCard
        rating={utilization.average}
        title="Fund utilization"
        totalReviews={utilization.count}
      />
      <RatingStatCard
        rating={development.average}
        title="Development"
        totalReviews={development.count}
        variant="warning"
        remark="Fair"
      />
    </div>
  );
}

export default ReviewStats;
