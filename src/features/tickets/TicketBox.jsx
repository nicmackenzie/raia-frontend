import { useRole } from '../../hooks/use-role';
import CitizenTickets from './CitizenTickets';
import LeaderTickets from './LeaderTickets';
function TicketBox() {
  const role = useRole();

  return (
    <div className="m-4">
      {role === 'citizen' ? <CitizenTickets /> : <LeaderTickets />}
    </div>
  );
}

export default TicketBox;
