import ChatInput from './ChatInput';
import ConversationMessages from './ConversationMessages';

function BarazasChat({ locked, endDate }) {
  const passed = new Date() > new Date(endDate);
  return (
    <div className="flex flex-col h-full ">
      <ConversationMessages />
      {!locked && !passed && <ChatInput />}
    </div>
  );
}

export default BarazasChat;
