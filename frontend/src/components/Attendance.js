import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); // yyyy-mm-dd
  const [students, setStudents] = useState([
    { username: 'student1', present: false },
    { username: 'student2', present: false },
  ]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/attendance/${date}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const updated = students.map(student => {
            const record = data.records.find(r => r.studentUsername === student.username);
            return { ...student, present: record ? record.present : false };
          });
          setStudents(updated);
        }
      });
  }, [date]);

  const toggleAttendance = (index) => {
    const newStudents = [...students];
    newStudents[index].present = !newStudents[index].present;
    setStudents(newStudents);
  };

  const saveAttendance = () => {
    Promise.all(
      students.map(student =>
        fetch('/api/attendance/mark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date,
            studentUsername: student.username,
            present: student.present,
          }),
        })
      )
    ).then(() => setMessage('Attendance saved!'));
  };

  return (
    <div>
      <h3>Attendance for {date}</h3>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <ul>
        {students.map((student, index) => (
          <li key={student.username}>
            {student.username}{' '}
            <input
              type="checkbox"
              checked={student.present}
              onChange={() => toggleAttendance(index)}
            />
          </li>
        ))}
      </ul>
      <button onClick={saveAttendance}>Save Attendance</button>
      <p>{message}</p>
    </div>
  );
};

export default Attendance;
