import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { buttonVariants } from '../../components/ui/Button';
import TicketTable from './TicketTable';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';

import { cn } from '../../lib/utils';
import { useUser } from '../authentication/use-user';
import { getTicketsByUser } from '../../services/tickets-api';

function CitizenTickets() {
  const {
    data: { user },
  } = useUser();
  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ['tickets', user.id],
    queryFn: () => getTicketsByUser(user?.id),
  });
  return (
    <div>
      <Link to="new" className={cn(buttonVariants({ default: 'default' }))}>
        New Ticket
      </Link>
      {isLoading && <Loader type="spinner" />}
      {error && (
        <Alert message={error.message} dismissable={false} variant="error" />
      )}
      {!isLoading && !error && tickets && <TicketTable tickets={tickets} />}
    </div>
  );
}

export default CitizenTickets;
