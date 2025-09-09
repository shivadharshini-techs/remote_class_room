import React, { useEffect, useState } from 'react';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch('/api/quizzes')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setQuizzes(data.quizzes);
      });
  }, []);

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const submitQuiz = () => {
    // For MVP, just show score count
    let score = 0;
    if (currentQuiz) {
      currentQuiz.questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) score++;
      });
      alert(`You scored ${score} out of ${currentQuiz.questions.length}`);
      setCurrentQuiz(null);
      setAnswers({});
    }
  };

  if (currentQuiz) {
    return (
      <div>
        <h3>{currentQuiz.title}</h3>
        {currentQuiz.questions.map((q, idx) => (
          <div key={idx}>
            <p>{q.questionText}</p>
            {q.options.map((opt, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`question-${idx}`}
                  onChange={() => handleAnswer(idx, i)}
                  checked={answers[idx] === i}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button onClick={submitQuiz}>Submit</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Available Quizzes</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            {quiz.title}
            <button onClick={() => setCurrentQuiz(quiz)}>Start Quiz</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
