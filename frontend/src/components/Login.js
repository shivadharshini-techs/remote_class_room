import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [userType, setUserType] = useState('student');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (username.trim() === '') {
    alert('Please enter a username');
    return;
  }
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, userType }),
    });
    const data = await res.json();
    if (data.success) {
      onLogin(data.user);
    } else {
      alert('Login failed: ' + data.message);
    }
  } catch (error) {
    alert('Server error');
  }
};


  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Remote Classroom Login</h2>
      <form onSubmit={handleSubmit}>
        <label>User Type:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Administrator</option>
        </select>

        <label>Username:</label>
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <button type="submit" style={{ marginTop: '10px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
