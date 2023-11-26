import { useRole } from '../../hooks/use-role.js';
import CitizenHome from './CitizenHome.jsx';
import LeaderHome from './LeaderHome.jsx';
function HomeBox() {
  const role = useRole();

  return role === 'leader' ? <LeaderHome /> : <CitizenHome />;
}

export default HomeBox;
