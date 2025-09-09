import React, { useEffect, useState } from 'react';

const MessageList = ({ userType }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`/api/messages?recipientType=${userType}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.messages);
      });
  }, [userType]);

  return (
    <div>
      <h3>Messages & Announcements</h3>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>
            <strong>{msg.sender}</strong>: {msg.content} <em>({new Date(msg.timestamp).toLocaleString()})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
