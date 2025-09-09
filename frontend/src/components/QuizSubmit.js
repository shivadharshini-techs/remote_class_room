function submitQuizOffline(quizId, answers) {
  let queue = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
  queue.push({ quizId, answers, timestamp: Date.now() });
  localStorage.setItem('quizSubmissions', JSON.stringify(queue));
}

async function syncSubmissions() {
  let queue = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
  for (const submission of queue) {
    try {
      await fetch('/api/quizzes/submit', { method: 'POST', body: JSON.stringify(submission) });
      // Remove from queue after success
      queue = queue.filter(q => q !== submission);
      localStorage.setItem('quizSubmissions', JSON.stringify(queue));
    } catch {
      // Stop on error, will retry later
      break;
    }
  }
}
