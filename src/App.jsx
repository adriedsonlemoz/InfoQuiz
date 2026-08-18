import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { appTheme } from './config/theme.js';
import { ACHIEVEMENTS } from './data/achievements.js';
import { usePlayerData } from './hooks/usePlayerData.js';
import { MAX_ENERGY } from './energy/energy.js';
import IntroScreen from './screens/quiz/IntroScreen.jsx';
import HubScreen from './screens/quiz/HubScreen.jsx';
import ModuleStartScreen from './screens/quiz/ModuleStartScreen.jsx';
import QuizScreen from './screens/quiz/QuizScreen.jsx';
import ResultScreen from './screens/quiz/ResultScreen.jsx';
import ReviewScreen from './screens/quiz/ReviewScreen.jsx';
import StatsScreen from './screens/quiz/StatsScreen.jsx';
import AchievementsScreen from './screens/quiz/AchievementsScreen.jsx';
import DiplomaScreen from './screens/quiz/DiplomaScreen.jsx';
import AboutScreen from './screens/quiz/AboutScreen.jsx';

export default function App({ onOpenCourse, initialModule = null, onConsumeInitialModule }) {
  const [screen, setScreen] = useState(() => (initialModule ? 'vest' : 'intro'));
  const [muted, setMuted] = useState(false);
  const { playerData, setPlayerData, energyTimer } = usePlayerData();
  const [gameConfig, setGameConfig] = useState(() => ({ cat: initialModule || '', mode: 'avaliacao' }));
  const [gameResults, setGameResults] = useState(null);
  const [toast, setToast] = useState({ show: false, title: '', desc: '' });
  const [alertModal, setAlertModal] = useState({ show: false, title: '', msg: '', color: '#00bcd4' });
  const [confirmModal, setConfirmModal] = useState({ show: false, title: '', msg: '', onConfirm: null, onCancel: null });

  useEffect(() => {
    if (initialModule && onConsumeInitialModule) onConsumeInitialModule();
  }, [initialModule, onConsumeInitialModule]);

  const playAudio = (id) => {
    if (muted) return;
    const audio = document.getElementById(id);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const triggerAchievement = (id) => {
    if (gameConfig.mode === 'treino') return;
    setPlayerData((previous) => {
      if (previous.achievements[id]) return previous;
      const achievement = ACHIEVEMENTS.find((item) => item.id === id);
      if (!achievement) return previous;
      setToast({ show: true, title: '🏆 Conquista Desbloqueada!', desc: achievement.name });
      window.setTimeout(() => setToast((current) => ({ ...current, show: false })), 4500);
      playAudio('snd-acerto');
      return {
        ...previous,
        achievements: { ...previous.achievements, [id]: true },
      };
    });
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: { xs: 1, sm: 2 } }}>
        <Paper elevation={24} className="app-container print-area" sx={{ width: '100%', maxWidth: '600px', p: { xs: 2, sm: 3 }, position: 'relative' }}>
          <Box className="no-print" sx={{ position: 'absolute', top: 15, right: 15, zIndex: 10 }}>
            <Button variant="outlined" color="primary" sx={{ minWidth: 40, p: 1, bgcolor: '#0b131c' }} onClick={() => setMuted((value) => !value)}>
              {muted ? '🔇' : '🔊'}
            </Button>
          </Box>

          {playerData.nome && screen !== 'intro' && screen !== 'game' && screen !== 'diploma' && (
            <Box className="no-print" sx={{ position: 'absolute', top: 15, left: 15, zIndex: 10, display: 'flex', alignItems: 'center', gap: 1, border: '1px solid', borderColor: 'primary.main', borderRadius: 5, px: 2, py: 0.5, bgcolor: '#0b131c' }}>
              <Typography fontWeight="bold" color="primary">🔋 {playerData.energia}/{MAX_ENERGY}</Typography>
              {playerData.energia < MAX_ENERGY && <Typography variant="caption" color="text.secondary">{energyTimer}</Typography>}
            </Box>
          )}

          <Snackbar open={toast.show} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="info" variant="filled" sx={{ width: '100%', fontWeight: 'bold', bgcolor: '#00bcd4', color: '#000' }}>{toast.title}: {toast.desc}</Alert>
          </Snackbar>

          <Dialog open={alertModal.show} onClose={() => setAlertModal((current) => ({ ...current, show: false }))} PaperProps={{ sx: { border: '2px solid', borderColor: alertModal.color || '#00bcd4', bgcolor: '#0b131c', borderRadius: 3 } }}>
            <DialogTitle sx={{ color: alertModal.color || '#00bcd4', fontWeight: 'bold', textTransform: 'uppercase' }}>{alertModal.title}</DialogTitle>
            <DialogContent><DialogContentText color="text.primary">{alertModal.msg}</DialogContentText></DialogContent>
            <DialogActions><Button onClick={() => setAlertModal((current) => ({ ...current, show: false }))} color="primary" variant="contained" fullWidth sx={{ m: 1 }}>Entendi</Button></DialogActions>
          </Dialog>

          <Dialog open={confirmModal.show} onClose={() => setConfirmModal((current) => ({ ...current, show: false }))} PaperProps={{ sx: { border: '2px solid #ff1744', bgcolor: '#0b131c', borderRadius: 3 } }}>
            <DialogTitle color="error" fontWeight="bold" textTransform="uppercase">{confirmModal.title}</DialogTitle>
            <DialogContent><DialogContentText color="text.primary">{confirmModal.msg}</DialogContentText></DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => { setConfirmModal((current) => ({ ...current, show: false })); confirmModal.onCancel?.(); }} color="inherit" variant="outlined" fullWidth>Cancelar</Button>
              <Button onClick={() => { setConfirmModal((current) => ({ ...current, show: false })); confirmModal.onConfirm?.(); }} color="error" variant="contained" fullWidth>Confirmar</Button>
            </DialogActions>
          </Dialog>

          {screen === 'intro' && <IntroScreen data={playerData} setPlayerData={setPlayerData} setScreen={setScreen} />}
          {screen === 'hub' && <HubScreen data={playerData} setScreen={setScreen} setGameConfig={setGameConfig} setAlertModal={setAlertModal} setConfirmModal={setConfirmModal} onOpenCourse={onOpenCourse} />}
          {screen === 'vest' && <ModuleStartScreen data={playerData} setPlayerData={setPlayerData} setScreen={setScreen} gameConfig={gameConfig} setGameConfig={setGameConfig} setAlertModal={setAlertModal} />}
          {screen === 'game' && <QuizScreen data={playerData} setPlayerData={setPlayerData} setScreen={setScreen} gameConfig={gameConfig} setGameResults={setGameResults} setConfirmModal={setConfirmModal} triggerAchievement={triggerAchievement} playAudio={playAudio} />}
          {screen === 'end' && <ResultScreen data={playerData} setPlayerData={setPlayerData} setScreen={setScreen} gameConfig={gameConfig} gameResults={gameResults} setGameResults={setGameResults} triggerAchievement={triggerAchievement} playAudio={playAudio} />}
          {screen === 'review' && <ReviewScreen gameResults={gameResults} setScreen={setScreen} />}
          {screen === 'stats' && <StatsScreen data={playerData} setScreen={setScreen} />}
          {screen === 'achievements' && <AchievementsScreen data={playerData} setScreen={setScreen} />}
          {screen === 'about' && <AboutScreen setScreen={setScreen} setAlertModal={setAlertModal} />}
          {screen === 'diploma' && <DiplomaScreen data={playerData} setScreen={setScreen} />}
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
