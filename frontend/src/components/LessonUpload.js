import React, { useState } from 'react';

const LessonUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/lessons/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (data.success) {
      setMessage(`Uploaded: ${data.lesson.originalName}`);
      setFile(null);
    } else {
      setMessage('Upload failed');
    }
  };

  return (
    <div>
      <h3>Upload Lesson</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default LessonUpload;
