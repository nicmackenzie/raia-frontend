import Button from "../components/ui/Button";
import CreateDiscussionForm from "../features/discussions/CreateDiscussionForm";
import DiscussionCard from "../features/discussions/DiscussionCard";

function Discussions() {
  return (
    <div>
      {/* <Button>Start a discussion</Button> */}
      <div>
        <CreateDiscussionForm/>
      </div>
    </div>
  );
}

export default Discussions;
