import React, { useEffect, useState } from 'react';

const LessonList = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch('/api/lessons');
        const data = await res.json();
        if (data.success) {
          setLessons(data.lessons);
          localStorage.setItem('lessons', JSON.stringify(data.lessons));
        }
      } catch (err) {
        const cached = localStorage.getItem('lessons');
        if (cached) setLessons(JSON.parse(cached));
      }
    }
    fetchLessons();
  }, []);

  // render your lessons here
};
export default LessonList;
