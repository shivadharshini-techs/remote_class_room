
import React, { useState } from 'react';

const QuizCreate = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: null },
  ]);
  const [message, setMessage] = useState('');

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optIndex = parseInt(field.slice(-1));
      updatedQuestions[index].options[optIndex] = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = parseInt(value);
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: null }]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Enter quiz title');
      return;
    }
    try {
      const res = await fetch('/api/quizzes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, questions }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Quiz created!');
        setTitle('');
        setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: null }]);
      } else {
        setMessage('Failed to create quiz');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div>
      <h3>Create Quiz</h3>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((q, idx) => (
        <div key={idx} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder={`Question ${idx + 1}`}
            value={q.questionText}
            onChange={(e) => handleQuestionChange(idx, 'questionText', e.target.value)}
          />
          {q.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleQuestionChange(idx, `option${i}`, e.target.value)}
            />
          ))}
          <select
            value={q.correctAnswer !== null ? q.correctAnswer : ''}
            onChange={(e) => handleQuestionChange(idx, 'correctAnswer', e.target.value)}
          >
            <option value="">Select Correct Answer</option>
            <option value="0">Option 1</option>
            <option value="1">Option 2</option>
            <option value="2">Option 3</option>
            <option value="3">Option 4</option>
          </select>
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Create Quiz</button>
      <p>{message}</p>
    </div>
  );
};

export default QuizCreate;
