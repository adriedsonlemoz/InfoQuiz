import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CourseApp from './CourseApp.jsx';
import './styles.css';

function Root() {
  const [view, setView] = useState('quiz');
  const [initialModule, setInitialModule] = useState(null);

  const openCourse = () => setView('course');
  const backToQuiz = () => {
    setInitialModule(null);
    setView('quiz');
  };
  const startQuiz = (moduleId) => {
    setInitialModule(moduleId);
    setView('quiz');
  };

  if (view === 'course') {
    return <CourseApp onBackToQuiz={backToQuiz} onStartQuiz={startQuiz} />;
  }

  return (
    <App
      onOpenCourse={openCourse}
      initialModule={initialModule}
      onConsumeInitialModule={() => setInitialModule(null)}
    />
  );
}

createRoot(document.getElementById('root')).render(<Root />);
