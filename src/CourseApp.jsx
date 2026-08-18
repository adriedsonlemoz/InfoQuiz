import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './config/theme.js';
import CourseHomeScreen from './screens/course/CourseHomeScreen.jsx';
import CourseLessonScreen from './screens/course/CourseLessonScreen.jsx';
import { loadPlayerData } from './storage/playerStorage.js';

export default function CourseApp({ onBackToQuiz, onStartQuiz }) {
  const [screen, setScreen] = useState('home');
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [unlockedModules] = useState(() => loadPlayerData().modulosDesbloqueados);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', pt: { xs: 2, sm: 4 }, pb: 4 }}>
        {screen === 'home' && (
          <CourseHomeScreen
            setScreen={setScreen}
            setActiveModuleId={setActiveModuleId}
            unlockedModules={unlockedModules}
            onBackToQuiz={onBackToQuiz}
          />
        )}
        {screen === 'lesson' && activeModuleId && (
          <CourseLessonScreen
            activeModuleId={activeModuleId}
            setActiveModuleId={setActiveModuleId}
            setScreen={setScreen}
            unlockedModules={unlockedModules}
            onStartQuiz={onStartQuiz}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
