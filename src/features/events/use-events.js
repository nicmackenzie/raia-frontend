import { useSearchParams } from 'react-router-dom';
import { addMonths, format, lastDayOfMonth } from 'date-fns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEventsByDateRange } from '../../services/events-api';

export function useEvents() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const firstDay = !searchParams.get('first-day')
    ? format(new Date(), 'yyyy-MM-01')
    : new Date(searchParams.get('first-day'));
  const lastDay = format(lastDayOfMonth(new Date(firstDay)), 'yyyy-MM-dd');

  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryFn: () =>
      getEventsByDateRange({ startDate: firstDay, endDate: lastDay }),
    queryKey: ['events', firstDay, lastDay],
  });

  // PRE FETCHING next
  const previousMonthStartDate = format(
    addMonths(new Date(firstDay), -1),
    'yyyy-MM-01'
  );
  const previusMonthLastDate = format(
    lastDayOfMonth(new Date(previousMonthStartDate)),
    'yyyy-MM-dd'
  );
  queryClient.prefetchQuery({
    queryKey: ['events', previousMonthStartDate, previusMonthLastDate],
    queryFn: () =>
      getEventsByDateRange({
        startDate: previousMonthStartDate,
        endDate: previusMonthLastDate,
      }),
  });

  // PRE FETCHING NEXT
  const nextMonthStartDate = format(
    addMonths(new Date(firstDay), 1),
    'yyyy-MM-01'
  );
  const nextMonthLastDate = format(
    lastDayOfMonth(new Date(nextMonthStartDate)),
    'yyyy-MM-dd'
  );
  queryClient.prefetchQuery({
    queryKey: ['events', nextMonthStartDate, nextMonthLastDate],
    queryFn: () =>
      getEventsByDateRange({
        startDate: nextMonthStartDate,
        endDate: nextMonthLastDate,
      }),
  });

  return { isLoading, events, error };
}
