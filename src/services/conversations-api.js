import { httpRequest, url } from '../lib/utils';

export async function createConversation(receiverId) {
  const data = await httpRequest(
    url + '/conversations',
    'POST',
    JSON.stringify({ receiver: receiverId })
  );
  return data;
}

export async function createMessage(details) {
  const { senderId, message, conversationId } = details;
  const data = await httpRequest(
    url + '/messages',
    'POST',
    JSON.stringify({
      sender_id: senderId,
      content: message,
      conversation_id: conversationId,
    })
  );
  return data;
}

export async function getConversations(userId) {
  if (!userId) return;
  const data = await httpRequest(url + '/conversations/' + userId);
  return data;
}
