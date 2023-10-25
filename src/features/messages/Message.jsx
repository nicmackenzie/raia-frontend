// Message.js
import React, { useState, useEffect } from 'react';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ sender: '', content: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  function fetchMessages() {
    fetch('http://localhost:3000/messages')
      .then((response) => {
        if (!response.ok) {
          console.error('Error fetching messages:', response.statusText);
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
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
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Error posting message:', response.statusText);
          throw new Error('Failed to post');
        }
        return response.json();
      })
      .then((data) => {
        setMessages([...messages, data]);
        setFormData({ sender: '', content: '' });
      })
      .catch((error) => {
        console.error('Error posting message:', error);
      });
  };

  return (
    <div className="container mx-auto p-8">
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{message.sender}</h2>
            <p className="text-gray-500 text-sm mb-2">{message.content}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Send Message</h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="sender" className="block text-gray-700 text-sm font-bold mb-2">
              Sender:
            </label>
            <input
              type="text"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              id="sender"
              className="border rounded w-full py-2 px-3"
            />     
            </div>
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
