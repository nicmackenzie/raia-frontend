import ChatInput from './ChatInput';
import ConversationMessages from './ConversationMessages';

function BarazasChat({ locked }) {
  return (
    <div className="flex flex-col h-full ">
      <ConversationMessages />
      {!locked && <ChatInput />}
    </div>
  );
}

export default BarazasChat;
