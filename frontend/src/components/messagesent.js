import React, { useState } from 'react';

const MessageSend = ({ sender }) => {
  const [content, setContent] = useState('');
  const [recipientType, setRecipientType] = useState('all');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!content.trim()) {
      alert('Enter a message');
      return;
    }
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, recipientType, content }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Message sent');
        setContent('');
      } else {
        setMessage('Failed to send');
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <div>
      <h3>Send Message / Announcement</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type message here..."
      />
      <br />
      <label>Send To:</label>
      <select value={recipientType} onChange={(e) => setRecipientType(e.target.value)}>
        <option value="all">All</option>
        <option value="students">Students</option>
        <option value="teachers">Teachers</option>
      </select>
      <br />
      <button onClick={sendMessage}>Send</button>
      <p>{message}</p>
    </div>
  );
};

export default MessageSend;
