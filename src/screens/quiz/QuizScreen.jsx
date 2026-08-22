import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { MODULE_NAMES } from '../../data/modules.js';
import { useQuizSession } from '../../hooks/useQuizSession.js';

function getTimerStyle(mode, streak, lives, timeLeft) {
  if (mode === 'treino') return { color: '#dbeafe', border: '#5d7d96', icon: '⏱️' };
  if (streak >= 3) return { color: '#86efac', border: '#4ade80', icon: '⚡' };
  if (lives === 1) return { color: '#fde68a', border: '#fbbf24', icon: '🛡️' };
  if (timeLeft <= 5) return { color: '#fecdd3', border: '#fb7185', icon: '⏱️' };
  return { color: '#dbeafe', border: '#5d7d96', icon: '⏱️' };
}

export default function QuizScreen({
  data,
  setPlayerData,
  setScreen,
  gameConfig,
  setGameResults,
  setConfirmModal,
  triggerAchievement,
  playAudio,
}) {
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const session = useQuizSession({
    data,
    setPlayerData,
    gameConfig,
    setGameResults,
    setScreen,
    triggerAchievement,
    playAudio,
  });

  const {
    questions,
    currentQuestion,
    currentOptions,
    currentIndex,
    lives,
    score,
    timeLeft,
    isPaused,
    powers,
    hiddenOptions,
    feedback,
    isShaking,
    streak,
    handleAnswer,
    nextQuestion,
    useFiftyFifty,
    useExtraTime,
    skipQuestion,
    pause,
    resume,
  } = session;

  if (!currentQuestion) {
    return <Typography align="center" mt={10}>Preparando as questões...</Typography>;
  }

  const timer = getTimerStyle(gameConfig.mode, streak, lives, timeLeft);
  const feedbackVisible = Boolean(feedback?.show);
  const feedbackCorrect = Boolean(feedback?.isOk);
  const selectedOption = feedback?.opt ?? null;

  const openPause = () => {
    pause();
    setPauseDialogOpen(true);
  };

  const closePause = () => {
    setPauseDialogOpen(false);
    resume();
  };

  const requestExit = () => {
    pause();
    setConfirmModal({
      show: true,
      title: 'Sair da avaliação',
      msg: 'Deseja sair agora? Esta tentativa não será registrada.',
      onConfirm: () => setScreen('hub'),
      onCancel: resume,
    });
  };

  return (
    <Box
      className={`${isShaking ? 'anim-shake ' : ''}quiz-viewport`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 0.8, sm: 1.25 },
        height: { xs: '100%', sm: '100%' },
        minHeight: 0,
        overflow: 'hidden',
        pt: { xs: 0.2, sm: 1 },
      }}
    >
      <Paper sx={{ p: { xs: 1, sm: 1.5 }, flex: '0 0 auto', bgcolor: 'rgba(24,49,73,0.96)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1} borderBottom="1px solid rgba(148,197,229,0.2)" pb={0.7} mb={0.8}>
          <Box minWidth={0}>
            <Typography color="primary" fontWeight="bold" fontSize={{ xs: '0.82rem', sm: '0.95rem' }} noWrap>{MODULE_NAMES[gameConfig.cat]}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>{data.avatar} {data.nome}</Typography>
          </Box>
          <Box display="flex" gap={0.6}>
            <Button variant="outlined" color="inherit" size="small" sx={{ minWidth: 40, p: 0.7 }} onClick={openPause}>⏸️</Button>
            <Button variant="outlined" color="error" size="small" sx={{ minWidth: 48, p: 0.7 }} onClick={requestExit}>Sair</Button>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns={gameConfig.mode === 'treino' ? 'repeat(3,1fr)' : 'repeat(4,1fr)'} gap={0.6} alignItems="stretch">
          {gameConfig.mode !== 'treino' && (
            <Box bgcolor="rgba(7,19,29,0.48)" px={0.6} py={0.55} borderRadius={1.5} border="1px solid rgba(251,113,133,0.3)" fontSize={{ xs: '0.7rem', sm: '0.82rem' }} textAlign="center" whiteSpace="nowrap">
              {lives > 0 ? '❤️'.repeat(lives) + '♡'.repeat(3 - lives) : '☠️'}
            </Box>
          )}
          <Box bgcolor="rgba(7,19,29,0.48)" px={0.6} py={0.55} borderRadius={1.5} border="1px solid" sx={{ color: timer.color, borderColor: timer.border, fontWeight: 'bold', fontSize: { xs: '0.72rem', sm: '0.82rem' }, textAlign: 'center', whiteSpace: 'nowrap' }}>
            {gameConfig.mode === 'treino' ? '⏱️ ∞' : `${timer.icon} ${timeLeft}s`}
          </Box>
          <Box bgcolor="rgba(7,19,29,0.48)" px={0.6} py={0.55} borderRadius={1.5} border="1px solid rgba(56,189,248,0.45)" color="primary.main" fontWeight="bold" fontSize={{ xs: '0.72rem', sm: '0.82rem' }} textAlign="center">⭐ {score}</Box>
          <Box bgcolor="rgba(7,19,29,0.48)" px={0.6} py={0.55} borderRadius={1.5} border="1px solid rgba(148,197,229,0.28)" fontWeight="bold" fontSize={{ xs: '0.72rem', sm: '0.82rem' }} textAlign="center">{currentIndex + 1}/{questions.length}</Box>
        </Box>
      </Paper>

      {gameConfig.mode === 'avaliacao' && (
        <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={0.65} flex="0 0 auto">
          <Button
            variant="outlined"
            sx={{ color: '#ede9fe', borderColor: 'rgba(167,139,250,0.7)', bgcolor: 'rgba(88,28,135,0.15)', py: { xs: 0.6, sm: 0.9 }, px: 0.5, minWidth: 0, fontSize: { xs: '0.69rem', sm: '0.78rem' }, opacity: powers.p5050 ? 0.45 : 1 }}
            disabled={powers.p5050 || isPaused || feedback}
            onClick={useFiftyFifty}
          >🌗 50/50</Button>
          <Button
            variant="outlined"
            sx={{ color: '#ede9fe', borderColor: 'rgba(167,139,250,0.7)', bgcolor: 'rgba(88,28,135,0.15)', py: { xs: 0.6, sm: 0.9 }, px: 0.5, minWidth: 0, fontSize: { xs: '0.69rem', sm: '0.78rem' }, opacity: powers.pTime ? 0.45 : 1 }}
            disabled={powers.pTime || isPaused || feedback}
            onClick={useExtraTime}
          >⏱️ +10s</Button>
          <Button
            variant="outlined"
            sx={{ color: '#ede9fe', borderColor: 'rgba(167,139,250,0.7)', bgcolor: 'rgba(88,28,135,0.15)', py: { xs: 0.6, sm: 0.9 }, px: 0.5, minWidth: 0, fontSize: { xs: '0.69rem', sm: '0.78rem' }, opacity: powers.pSkip ? 0.45 : 1 }}
            disabled={powers.pSkip || isPaused || feedback}
            onClick={skipQuestion}
          >⏭️ Pular</Button>
        </Box>
      )}

      <Paper sx={{ p: { xs: 1.15, sm: 2 }, textAlign: 'center', borderTop: '3px solid #38bdf8', bgcolor: 'rgba(21,53,75,0.96)', flex: '0 0 auto' }}>
        <Typography fontSize={{ xs: '0.96rem', sm: '1.08rem' }} fontWeight={650} lineHeight={1.28}>{currentQuestion.q}</Typography>
      </Paper>

      <Grid container spacing={{ xs: 0.75, sm: 1 }} sx={{ flex: 1, minHeight: 0, alignContent: 'stretch' }}>
        {currentOptions.map((option) => {
          let buttonStyle = {
            px: { xs: 0.8, sm: 1.4 },
            py: { xs: 0.7, sm: 1.25 },
            height: '100%',
            minHeight: 0,
            fontWeight: 650,
            fontSize: { xs: '0.78rem', sm: '0.9rem' },
            lineHeight: 1.2,
            bgcolor: 'rgba(29,64,88,0.95)',
            color: 'text.primary',
            border: '1px solid rgba(148,197,229,0.3)',
            textTransform: 'none',
            visibility: hiddenOptions.includes(option) ? 'hidden' : 'visible',
            overflow: 'hidden',
          };

          if (feedback) {
            if (option === currentQuestion.c) {
              buttonStyle = { ...buttonStyle, bgcolor: 'rgba(74,222,128,0.18)', color: '#dcfce7', border: '2px solid #4ade80', fontWeight: 800 };
            } else if (!feedbackCorrect && option === selectedOption) {
              buttonStyle = { ...buttonStyle, bgcolor: 'rgba(251,113,133,0.14)', color: '#ffe4e6', border: '2px solid #fb7185' };
            }
          }

          return (
            <Grid item xs={6} key={option} sx={{ display: 'flex', minHeight: 0 }}>
              <Button fullWidth sx={buttonStyle} onClick={() => handleAnswer(option)} disabled={feedback !== null}>{option}</Button>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={pauseDialogOpen} PaperProps={{ sx: { bgcolor: '#183149' } }}>
        <DialogTitle color="primary" fontWeight="bold">⏸️ Avaliação pausada</DialogTitle>
        <DialogContent><DialogContentText color="text.primary">O cronômetro está parado. Retome quando estiver pronto.</DialogContentText></DialogContent>
        <DialogActions><Button onClick={closePause} variant="contained" fullWidth sx={{ m: 1 }}>Retomar</Button></DialogActions>
      </Dialog>

      <Dialog
        open={feedbackVisible}
        BackdropProps={{ sx: { backgroundColor: 'rgba(5,18,29,0.9)' } }}
        PaperProps={{ sx: { border: '2px solid', borderColor: feedbackCorrect ? '#4ade80' : '#fb7185', bgcolor: '#183149', borderRadius: 3, p: 0.5, maxWidth: 460 } }}
      >
        <Box p={2} textAlign="center">
          <Typography fontSize="3rem" mb={0.5} lineHeight={1}>{feedbackCorrect ? '✅' : '❌'}</Typography>
          <Typography variant="h5" fontWeight="bold" color={feedbackCorrect ? 'success.main' : 'error.main'} mb={1.5}>
            {feedbackCorrect ? 'Resposta correta!' : (selectedOption === null ? 'Tempo esgotado' : 'Resposta incorreta')}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>{currentQuestion.q}</Typography>
          <Box bgcolor="rgba(7,19,29,0.46)" p={1.5} borderRadius={2} borderLeft={`4px solid ${feedbackCorrect ? '#4ade80' : '#fb7185'}`} textAlign="left" mb={1.5}>
            <Typography variant="caption" color="text.secondary">Resposta correta</Typography>
            <Typography fontWeight="bold" fontSize="1rem">{currentQuestion.c}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={2.5} textAlign="left" lineHeight={1.5}>{currentQuestion.d}</Typography>
          <Button variant="contained" fullWidth onClick={nextQuestion}>Continuar</Button>
        </Box>
      </Dialog>
    </Box>
  );
}
