import Button from "../components/ui/Button";
import { useUser } from "../features/authentication/use-user";
import CreateDiscussionForm from "../features/discussions/CreateDiscussionForm";
import DiscussionCard from "../features/discussions/DiscussionCard";
import { Link } from "react-router-dom";


function Discussions() {
  const { data } = useUser();
  const role = data?.user_metadata?.role.toLowerCase();
  return (
    <div>
      {role === "leader"? <Link to={'/discussions/create'} ><Button> Start Discussion</Button></Link> : <></>}
      <div>
        <DiscussionCard/>
      </div>
    </div>
  );
}

export default Discussions;
