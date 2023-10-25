import SingleMessage from './SingleMessage';
import Input from '../../components/ui/Input';

function MessageBox() {
  return (
    <div className="max-w-2xl mx-4 md:mx-auto p-4 space-y-2">
      <Input placeholder="Search message..." className="" />
      <SingleMessage />
    </div>
  );
}

export default MessageBox;
