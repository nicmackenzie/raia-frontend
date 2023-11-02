import { useQuery } from '@tanstack/react-query';
import ReviewBox from '../features/reviews/ReviewBox';
import { getReviews } from '../services/reviews-api';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';

function getStat(reviews, category) {
  let array;
  if (category) {
    array = reviews.filter(review => review.category === category);
  } else {
    array = reviews;
  }
  const sumOfReview = array.reduce(
    (acc, cur) => acc + parseFloat(cur.rating),
    0
  );

  const averageReview = sumOfReview / array.length;
  return { average: averageReview.toFixed(1), count: array.length };
}

function Reviews() {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
  });

  if (isLoading) return <Loader />;
  if (error) {
    return <Alert message={error} variant="error" dismissable={false} />;
  }

  return (
    <ReviewBox
      score={getStat(reviews || [])}
      governance={getStat(reviews || [], 'governance')}
      utilization={getStat(reviews || [], 'fund-utilization')}
      development={getStat(reviews || [], 'development')}
    />
  );
}

export default Reviews;
