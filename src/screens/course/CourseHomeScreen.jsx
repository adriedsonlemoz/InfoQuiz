import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { MODULES } from '../../data/modules.js';

export default function CourseHomeScreen({ setScreen, setActiveModuleId, unlockedModules, onBackToQuiz }) {
  return (
    <Box sx={{ width: '100%', maxWidth: '600px', p: { xs: 1, sm: 2 } }}>
      <Paper elevation={12} sx={{ p: 3, mb: 3, textAlign: 'center', background: 'linear-gradient(135deg, rgba(22,101,52,0.62), rgba(30,64,89,0.92))', borderBottom: '3px solid #4ade80' }}>
        <Typography variant="h4" fontWeight={900} color="primary" sx={{ mb: 1, textTransform: 'uppercase' }}>📖 Material de Estudo</Typography>
        <Typography variant="subtitle1" color="text.secondary">Estude a teoria e os exemplos antes de fazer as avaliações.</Typography>
      </Paper>

      <Grid container spacing={1.5} mb={3}>
        {MODULES.map((module, index) => {
          const isUnlocked = unlockedModules[module.id];
          return (
            <Grid item xs={6} key={module.id}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 1,
                  height: '100%',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.5,
                  border: isUnlocked ? '1px solid rgba(148,197,229,0.28)' : '1px dashed rgba(148,197,229,0.2)',
                  transition: '0.2s',
                  '&:hover': isUnlocked ? { borderColor: 'primary.main', bgcolor: 'rgba(56,189,248,0.07)', transform: 'scale(1.02)' } : {},
                }}
                onClick={() => {
                  if (!isUnlocked) return;
                  setActiveModuleId(module.id);
                  setScreen('lesson');
                }}
              >
                <Typography fontSize="2.5rem">{isUnlocked ? module.icon : '🔒'}</Typography>
                <Box>
                  <Typography variant="body2" fontWeight="bold" lineHeight={1.2} mb={0.5} color={isUnlocked ? 'white' : 'text.secondary'}>{module.label}</Typography>
                  <Typography variant="caption" color="text.secondary" display="block">Módulo {index + 1}</Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Button variant="outlined" color="error" fullWidth size="large" onClick={onBackToQuiz}>Sair e Voltar ao Quiz</Button>
    </Box>
  );
}
