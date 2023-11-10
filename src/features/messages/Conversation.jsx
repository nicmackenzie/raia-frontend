import Avatar from '../../components/ui/Avatar';
import defaultImage from '../../assets/default-user.jpg';
import { formatDateDistance } from '../../lib/utils';
import { useMessage } from '../../context/messages-context';

function Conversation({ id, lastMessage, otherUserId }) {
  const { onConversationSelect } = useMessage();

  function handleSelect() {
    onConversationSelect(id);
  }

  return (
    <div
      className="flex items-center gap-2 py-2 px-4 border-b cursor-pointer transition-colors hover:bg-secondary"
      onClick={handleSelect}
    >
      <Avatar
        src={otherUserId?.profile_image || defaultImage}
        alt={`Avatar for ${otherUserId.full_name}`}
      />
      <div className="flex flex-col gap-0.5 w-full overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="text-tertiary font-bold text-xs">
            {otherUserId?.full_name}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDateDistance(
              lastMessage?.created_at ? lastMessage.created_at : new Date()
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{lastMessage?.content}</p>
      </div>
    </div>
  );
}

export default Conversation;
