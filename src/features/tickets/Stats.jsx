import { CheckCircle, Hourglass, MessageSquare, Ticket } from 'lucide-react';
import TicketStatCard from './TicketStatCard';
function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TicketStatCard title="Total Tickets" number={6} icon={Ticket} />
      <TicketStatCard
        title="Pending Tickets"
        number={2}
        icon={Hourglass}
        className="border-l-red-300"
      />
      <TicketStatCard
        title="Answered Tickets"
        number={2}
        icon={MessageSquare}
        className="border-l-orange-300"
      />
      <TicketStatCard
        title="Closed Tickets"
        number={2}
        icon={CheckCircle}
        className="border-l-green-300"
      />
    </div>
  );
}

export default Stats;
