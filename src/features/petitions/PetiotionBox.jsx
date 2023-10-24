import { Link } from 'react-router-dom';
import { buttonVariants } from '../../components/ui/Button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../../components/ui/Select2';
import { cn } from '../../lib/utils';

function PetiotionBox() {
  return (
    <div className="space-y-3 m-4">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link
          to="/petitions/new"
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          Start a petition
        </Link>
        <Select>
          <SelectTrigger className="w-full md:w-72">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="recent">Recent Petitions</SelectItem>
              <SelectItem value="most">Most signatures</SelectItem>
              <SelectItem value="mine">My Petitions</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>
    </div>
  );
}

export default PetiotionBox;
