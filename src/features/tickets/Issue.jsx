import Avatar from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';

function Issue({ src, fullName, userName, title }) {
  return (
    <div className="border max-w-2xl  rounded-lg p-4 flex flex-col gap-6 ">
      <div className="flex items-center flex-shrink-0 gap-1.5">
        <Avatar src={src} alt={`avatar for ${fullName}`} />
        <div>
          <div className="text-sm font-semibold">{fullName}</div>
          <span className="text-xs text-muted-foreground block -my-1">
            @{userName}
          </span>
          <Badge size="sm" className="text-[8px]">
            PIONEER
          </Badge>
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-base md:text-lg text-tertiary font-semibold">
          {title}
        </div>
        <p className="text-xs text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          voluptas excepturi autem porro nihil labore consequuntur sunt. Fugit
          id debitis iste nisi ipsa necessitatibus! Ad illo quam repellat
          voluptatum quaerat.
        </p>
      </div>
    </div>
  );
}

export default Issue;
