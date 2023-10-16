import Button from "../components/ui/Button";
import CreateDiscussionForm from "../features/discussions/CreateDiscussionForm";
import DiscussionCard from "../features/discussions/DiscussionCard";
import DiscussonDetail from "../features/discussions/DiscussonDetail";

function Discussions() {
  return (
    <div>
      {/* <Button>Start a discussion</Button> */}
      <div>
        <DiscussonDetail/>
      </div>
    </div>
  );
}

export default Discussions;
