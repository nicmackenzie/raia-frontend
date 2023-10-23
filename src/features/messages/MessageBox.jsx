import Avatar from '../../components/ui/Avatar';
function MessageBox() {
  return (
    <div className="max-w-2xl mx-4 md:mx-auto p-4">
      <div className="flex items-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-secondary">
          <Avatar src="https://i.pravatar.cc/48?u=118836" alt="" className="" />
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Mellisa Bridge</div>
          </div>
          <p className="text-xs text-muted-foreground">
            This is a test message
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
