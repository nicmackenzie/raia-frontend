import { Search } from 'lucide-react';
import Input from '../../components/ui/Input';

function SearchFriend() {
  return (
    <form className="w-full">
      <div className="relative">
        <Search className="text-muted-foreground w-4 h-4 absolute left-2 top-2" />
        <Input size="small" placeholder="Search..." className="pl-8" />
      </div>
    </form>
  );
}

export default SearchFriend;
