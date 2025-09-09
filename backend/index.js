const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Storage setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'lessons/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});
const upload = multer({ storage: storage });

// Mock lessons array to hold metadata
let lessons = [];

// Upload lesson (only for teachers)
app.post('/api/lessons/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const lesson = {
    id: lessons.length + 1,
    originalName: req.file.originalname,
    filename: req.file.filename,
    uploadedAt: new Date()
  };
  lessons.push(lesson);
  res.status(200).json({ success: true, lesson });
});

// List lessons (students fetch this)
app.get('/api/lessons', (req, res) => {
  res.status(200).json({ success: true, lessons });
});

// Serve lesson files statically
app.use('/lessons', express.static('lessons'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory store for quizzes
let quizzes = [];

// Create quiz (teachers)
app.post('/api/quizzes/create', (req, res) => {
  const { title, questions } = req.body;
  if (!title || !questions) {
    return res.status(400).json({ success: false, message: 'Missing title or questions' });
  }
  const quiz = {
    id: quizzes.length + 1,
    title,
    questions,
  };
  quizzes.push(quiz);
  res.status(200).json({ success: true, quiz });
});

// Get all quizzes (students)
app.get('/api/quizzes', (req, res) => {
  res.status(200).json({ success: true, quizzes });
});
// In-memory attendance store
// In-memory attendance store
let attendanceRecords = [];

// Mark attendance (teachers)
app.post('/api/attendance/mark', (req, res) => {
  const { date, studentUsername, present } = req.body;
  if (!date || !studentUsername || typeof present !== 'boolean') {
    return res.status(400).json({ success: false, message: 'Invalid attendance data' });
  }
  // Remove existing record if any
  attendanceRecords = attendanceRecords.filter(
    record => !(record.date === date && record.studentUsername === studentUsername)
  );
  attendanceRecords.push({ date, studentUsername, present });
  res.status(200).json({ success: true });
});

// Fetch attendance by date (teachers)
app.get('/api/attendance/:date', (req, res) => {
  const date = req.params.date;
  const records = attendanceRecords.filter(record => record.date === date);
  res.status(200).json({ success: true, records });
});

let quizSubmissions = [];

app.post('/api/quizzes/submit', (req, res) => {
  const { quizId, answers } = req.body;
  if (!quizId || !answers) {
    return res.status(400).json({ success: false, message: 'Missing data' });
  }
  quizSubmissions.push({ quizId, answers, timestamp: new Date() });
  res.status(200).json({ success: true });
});

// In-memory message store
let messages = [];

// Post message (teacher)
app.post('/api/messages/send', (req, res) => {
  const { sender, recipientType, content, timestamp } = req.body;
  if (!sender || !recipientType || !content) {
    return res.status(400).json({ success: false, message: 'Missing message data' });
  }
  messages.push({ sender, recipientType, content, timestamp: timestamp || new Date() });
  res.status(200).json({ success: true });
});

// Get messages (students and teachers)
app.get('/api/messages', (req, res) => {
  // Filter messages based on recipient type: 'all', 'students', 'teachers'
  const recipientType = req.query.recipientType;
  const filtered = messages.filter(m => m.recipientType === recipientType || m.recipientType === 'all');
  res.status(200).json({ success: true, messages: filtered });
});
