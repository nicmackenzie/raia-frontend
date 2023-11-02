import { useQuery } from '@tanstack/react-query';
import Select from '../../components/ui/Select';
import { CATEGORY_OPTIONS, PAGE_SIZE } from '../../lib/utils';
import ReviewStats from './ReviewStats';
import { getReviews } from '../../services/reviews-api';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';
import Filter from '../../components/ui/Filter';
import Review from './Review';
import notFound from '../../assets/not-found.svg';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/ui/Pagination';

function ReviewBox({ score, governance, utilization, development }) {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('category');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'category', value: filterValue };

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ['reviews', filter, page],
    queryFn: () => getReviews({ filter }),
  });

  const start = (page - 1) * PAGE_SIZE;
  const end = page * PAGE_SIZE;
  const paginated = reviews?.slice(start, end);

  if (isLoading) return <Loader />;
  if (error)
    return <Alert message={error} variant="error" dismissable={false} />;

  return (
    <div className="space-y-6 p-4">
      <ReviewStats
        score={score}
        governance={governance}
        utilization={utilization}
        development={development}
      />
      <div className="flex justify-end my-6 w-full lg:hidden">
        <Select placeholder="Filter by..." options={CATEGORY_OPTIONS} />
      </div>
      <div className="hidden lg:block w-max">
        <Filter
          filterKey="category"
          options={[{ value: 'all', label: 'All' }, ...CATEGORY_OPTIONS]}
        />
      </div>
      <div className="space-y-4">
        {paginated.length > 0 ? (
          paginated.map(review => <Review key={review.id} {...review} />)
        ) : (
          <NoReviews />
        )}
      </div>
      <Pagination count={reviews.length} style="modern" />
    </div>
  );
}

function NoReviews() {
  return (
    <div className="flex flex-col items-center">
      <img
        src={notFound}
        alt="Not found illustration"
        className="  w-36 md:w-48 h-auto"
      />
      <p className="text-sm md:text-base text-muted-foreground">
        No reviews found for selected category
      </p>
    </div>
  );
}

export default ReviewBox;
