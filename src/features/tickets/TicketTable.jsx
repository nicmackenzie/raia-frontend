import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

function TicketTable({ tickets }) {
  const navigate = useNavigate();
  function handleClick(id) {
    navigate('' + id);
  }
  return (
    <div>
      <table className="hidden min-w-full text-gray-900 dark:text-gray-50 md:table mt-6">
        <thead className="rounded-lg text-left text-sm font-normal bg-secondary">
          <tr>
            <th scope="col" className="px-3 py-5 font-medium">
              Ticket #
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Category
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Attention
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <tr
                key={ticket.id}
                className="w-full border-b py-3 text-sm capitalize [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg cursor-pointer"
                onClick={() => handleClick(ticket.id)}
              >
                <td className="whitespace-nowrap px-3 py-3">
                  {ticket.ticket_no}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {ticket.category}
                </td>
                <td className={cn('whitespace-nowrap px-3 py-3')}>
                  <Badge
                    className={cn(
                      'text-[8px]',
                      ticket.status === 'pending' &&
                        'bg-red-300 text-gray-900 dark:bg-red-600 dark:text-gray-200',
                      ticket.status === 'answered' &&
                        'bg-yellow-300 dark:bg-yellow-700',
                      ticket.status === 'closed' &&
                        'bg-teal-400 dark:bg-teal-600'
                    )}
                    size="sm"
                  >
                    {ticket.status}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {ticket.assigned_leader_id.full_name}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {format(new Date(ticket.created_at), 'dd MMM yy')}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center text-lg font-semibold text-muted-foreground"
              >
                No tickets raised
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;
