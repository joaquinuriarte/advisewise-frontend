import React, { useState } from 'react';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    // Add the new message to the existing messages array
    setMessages([...messages, message]);
    setMessage(''); // Clear the input field after sending the message
  };

  return (
    <div className="class-table-border h-full p-2">
      <div className="overflow-y-auto">
        {/* Map over your messages and display them */}
        {messages.map((msg, i) => (
          <div key={i} className="class-table-row mb-2">
            <span className="elegant-heading-small">{msg}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="mt-2">
        <input 
          type="text" 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          className="rounded-lg border p-2 w-full elegant-heading-small" 
          placeholder="Type your message..." 
        />
        <button type="submit" className="p-2 bg-blue text-white rounded-lg mt-2 elegant-heading-small w-full">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
