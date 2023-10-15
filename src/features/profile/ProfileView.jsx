import { useParams } from 'react-router-dom';

import Avatar from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MoreVertical } from 'lucide-react';

function ProfileView() {
  return (
    <header className="min-h-[13rem] bg-background shadow rounded-sm pb-8">
      <div className="bg-gradient-to-r from-gold/30 to-primary/30 h-24 relative">
        <Avatar
          src="https://i.pravatar.cc/48?u=123123"
          className="w-20 h-20 absolute left-16 md:left-20 -bottom-10"
          alt="user avatar"
        />
      </div>
      <div className="pt-12 px-6 flex flex-col gap-6 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg md:text-xl lg:3xl font-bold">Amanda Rose</h1>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-sm md:text-base -mt-1">
              @amandarose
            </p>
            <Badge variant="default" className="text-[10px] py-[1px]">
              Pioneer
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button size="xs">Message</Button>
          <Button size="xs" variant="secondary">
            Follow
          </Button>
          <Button variant="ghost" size="xs">
            <MoreVertical />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default ProfileView;
