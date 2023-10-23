import Avatar from '../../components/ui/Avatar';
function SingleMessage() {
  return (
    <div className="flex items-center gap-2 border-b border-b-slate-100 dark:border-b-slate-800 pb-1 last:pb-0 last:border-b-0">
      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <Avatar src="https://i.pravatar.cc/48?u=118836" alt="" className="" />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <div className="text-sm font-semibold">Mellisa Bridge</div>
            <span className="text-xs text-muted-foreground">@melbridge</span>
          </div>
          <div className="text-xs font-semibold">Today</div>
        </div>
        <p className="text-xs text-muted-foreground">This is a test message</p>
      </div>
    </div>
  );
}

export default SingleMessage;
