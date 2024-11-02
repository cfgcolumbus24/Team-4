import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message to messages array
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      // Send request to the backend /chat endpoint
      const response = await axios.post('http://localhost:5004/chat', { message: input });
      const botReply = response.data.response;

      // Add bot's response to messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botReply },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `Mathematics: 5 teachers, \nScience: 3 teachers, \nEnglish: 4 teachers, \nHistory: 2 teachers, \nArt: 1 teacher` },
      ]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 p-4">
      <div className="w-full max-w-md bg-white p-4 rounded-lg border-2 border-black shadow-lg">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Chat with AI</h2>

        <div className="h-64 overflow-y-auto p-4 bg-blue-50 border border-gray-300 rounded-md mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-400 rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-800"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
