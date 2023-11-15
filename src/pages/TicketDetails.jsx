import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Alert from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import Loader from '../components/ui/Loader';
import { BackButton } from '../components/ui/Button';
import { getTicket } from '../services/tickets-api';
import { format } from 'date-fns';

function TicketDetails() {
  const { ticketId } = useParams();
  const {
    isLoading,
    data: ticket,
    error,
  } = useQuery({
    queryFn: () => getTicket(ticketId),
    queryKey: ['tickets', ticketId],
  });

  if (error)
    return (
      <Alert message={error.message} dismissable={false} variant="error" />
    );
  if (isLoading) return <Loader type="spinner" />;

  const {
    data: { title, description, creator, assignedleader, created_at, status },
  } = ticket;
  //   console.log(data);

  return (
    <div className="m-4">
      <BackButton />
      <article className="mt-4 max-w-xl px-4 py-2">
        <h1 className="text-lg md:text-2xl text-bold text-tertiary">{title}</h1>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 mt-4">
          <div className="text-sm">
            <span className="inline-block font-semibold">Raised By</span>:{' '}
            {creator.fullName}
          </div>
          <div className="text-sm">
            <span className="inline-block font-semibold">To</span>:{' '}
            {assignedleader.fullName}
          </div>
          <div className="text-sm">
            <span className="inline-block font-semibold">Raised On</span>:{' '}
            {created_at && format(new Date(created_at), 'dd MMMM yy')}
          </div>
          <div className="text-sm">
            <span className="inline-block font-semibold">Status</span>:{' '}
            <Badge variant="secondary" size="sm">
              {status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </article>
    </div>
  );
}

export default TicketDetails;
