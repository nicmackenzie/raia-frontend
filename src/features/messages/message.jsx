import React, { useState, useEffect } from 'react';
import { useUser } from '../authentication/use-user';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ receiver: '', content: '' });
  const [showSentMessages, setShowSentMessages] = useState(true);
  const { data } = useUser();

  useEffect(() => {
    fetchMessages();
  }, []);

  function fetchMessages() {
    const endpoint = showSentMessages ? 'my_received_messages/2' : 'my_sent_messages/2'; // Replace '2' with the appropriate user ID
    fetch(`http://localhost:3000/messages/${endpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${showSentMessages ? 'sent' : 'received'} messages`);
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error(`Error fetching ${showSentMessages ? 'sent' : 'received'} messages:`, error);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newObj = {
      ...formData,
      sender_id: data?.user?.id && data?.user?.id || 2,
    };
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to post message');
        }
        return response.json();
      })
      .then((data) => {
        setMessages([...messages, data]);
        setFormData({ receiver: '', content: '' });
      })
      .catch((error) => {
        console.error('Error posting message:', error);
      });
  };

  const toggleMessages = () => {
    setShowSentMessages(!showSentMessages);
    fetchMessages();
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{showSentMessages ? 'Sent Messages' : 'Received Messages'}</h2>
        <button
          onClick={toggleMessages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showSentMessages ? 'Show Received' : 'Show Sent'}
        </button>
      </div>
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-500 text-sm mb-2 text-blue-600 font-bold">
              Sender: {message.sender_id}
            </p>
            <div className="border-t my-2"></div>
            <p className="text-lg mb-2">{message.content}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Send Message</h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="receiver" className="block text-gray-700 text-sm font-bold mb-2">
              Receiver:
            </label>
            <input
              type="text"
              name="receiver"
              value={formData.receiver}
              onChange={handleChange}
              id="receiver"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content:
            </label>
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              id="content"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
