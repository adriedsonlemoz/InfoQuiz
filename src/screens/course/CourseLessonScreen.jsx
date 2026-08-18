import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { COURSE_CONTENT } from '../../data/courseContent.js';
import { MODULES } from '../../data/modules.js';

export default function CourseLessonScreen({ activeModuleId, setActiveModuleId, setScreen, unlockedModules, onStartQuiz }) {
  const currentIndex = MODULES.findIndex((module) => module.id === activeModuleId);
  const activeModule = MODULES[currentIndex];

  if (!activeModule) {
    return (
      <Box sx={{ width: '100%', maxWidth: '600px', p: 2 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" fontWeight="bold" mb={2}>Módulo não encontrado.</Typography>
          <Button variant="contained" onClick={() => setScreen('home')}>Voltar ao material</Button>
        </Paper>
      </Box>
    );
  }

  const lesson = COURSE_CONTENT[activeModuleId] || { intro: 'Conteúdo em desenvolvimento.', secoes: [] };
  const previousModule = currentIndex > 0 ? MODULES[currentIndex - 1] : null;
  const nextModule = currentIndex < MODULES.length - 1 ? MODULES[currentIndex + 1] : null;
  const isNextUnlocked = nextModule ? unlockedModules[nextModule.id] : false;

  const goToModule = (moduleId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveModuleId(moduleId);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '800px', p: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, mb: 3, borderTop: '4px solid #8a2be2', bgcolor: '#0b131c' }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Typography fontSize="3.5rem" lineHeight={1}>{activeModule.icon}</Typography>
          <Box>
            <Typography variant="caption" color="primary" fontWeight="bold" textTransform="uppercase">Módulo {currentIndex + 1}</Typography>
            <Typography variant="h4" color="secondary" fontWeight="bold" textTransform="uppercase">{activeModule.label}</Typography>
          </Box>
        </Box>

        <Typography variant="body1" color="text.primary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}>{lesson.intro}</Typography>
        <Divider sx={{ mb: 4, borderColor: '#1e3a5f' }} />

        {lesson.secoes?.map((section, index) => (
          <Box key={`${activeModuleId}-${index}`} sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 1.5 }}>{section.titulo}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{section.texto}</Typography>
          </Box>
        ))}

        {lesson.tutorial && (
          <Paper sx={{ mt: 5, p: 3, bgcolor: '#001b1e', border: '1px solid #00bcd4', borderRadius: 3 }}>
            <Typography variant="subtitle2" color="success.main" textTransform="uppercase" fontWeight="bold" mb={1}>🛠️ Mini-Tutorial Prático</Typography>
            <Typography variant="h6" color="white" fontWeight="bold" mb={2}>{lesson.tutorial.titulo}</Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(0,188,212,0.3)' }} />
            <List dense>
              {lesson.tutorial.passos.map((step, index) => (
                <ListItem key={index} sx={{ px: 0, alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 35, color: 'success.main', mt: 0.5 }}>▶</ListItemIcon>
                  <ListItemText primary={step} primaryTypographyProps={{ style: { color: '#90caf9', fontSize: '1rem', lineHeight: 1.5 } }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
        <Button variant="contained" color="success" size="large" fullWidth onClick={() => onStartQuiz(activeModuleId)} sx={{ py: 2, fontSize: '1.1rem', border: '2px solid #fff' }}>
          ✍️ ESTOU PRONTO! FAZER AVALIAÇÃO AGORA
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Button variant="outlined" color="inherit" disabled={!previousModule} onClick={() => previousModule && goToModule(previousModule.id)} sx={{ flex: 1, p: 1 }}>⬅️ Anterior</Button>
          <Button variant="contained" color="primary" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setScreen('home'); }} sx={{ flex: 1, p: 1 }}>🏠 Menu</Button>
          <Button variant="outlined" color="inherit" disabled={!nextModule || !isNextUnlocked} onClick={() => nextModule && isNextUnlocked && goToModule(nextModule.id)} sx={{ flex: 1, p: 1, opacity: (!nextModule || !isNextUnlocked) ? 0.5 : 1 }}>
            {nextModule && isNextUnlocked ? 'Próximo ➡️' : '🔒 Trancado'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
