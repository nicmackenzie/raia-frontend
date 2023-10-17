import React, { useState } from 'react';

function MessageForm() {
    // These are local states that hold the form data.
    const [senderId, setSenderId] = useState(''); // State for sender's ID
    const [receiverId, setReceiverId] = useState(''); // State for receiver's ID
    const [content, setContent] = useState(''); // State for the message content

    // This function handles the form submission.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.
        
        // Construct the data from the states.
        const messageData = {
            sender_id: senderId,
            receiver_id: receiverId,
            content: content
        };

        // Make an API call to the backend to save the message.
        fetch('/messages', {
            method: 'POST', // The HTTP method.
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON.
            },
            body: JSON.stringify(messageData) // Convert the data to JSON string.
        })
        .then(res => res.json()) // Parse the response data as JSON.
        .then(data => {
            console.log("Message sent:", data); // For debugging: log the response.
            // In a real-world scenario, you'd handle what to do with the response here.
        })
        .catch(err => console.error("Error sending message:", err)); // Handle any errors.
    };

    // The rendered component: A form with inputs for sender ID, receiver ID, and content.
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Sender ID" 
                value={senderId} 
                onChange={(e) => setSenderId(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Receiver ID" 
                value={receiverId} 
                onChange={(e) => setReceiverId(e.target.value)} 
            />
            <textarea 
                placeholder="Message Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
            />
            <button type="submit">Send</button>
        </form>
    );
}

export default MessageForm;
