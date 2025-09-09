import React from 'react';
import LessonUpload from './LessonUpload';
import QuizCreate from './QuizCreate';
import Attendance from './Attendance';
import messagesent from './messagesent';
import messagelist from './messagelist';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.username} ({user.userType})</h1>
      {user.userType === 'teacher' ? (
        <>
          <LessonUpload />
          <QuizCreate />
          <Attendance />
          <messagesent sender={user.username} />
          <messagelist userType="teachers" />
        </>
      ) : (
        <>
          <LessonList />
          <QuizList />
          <messagelist userType="students" />
        </>
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
