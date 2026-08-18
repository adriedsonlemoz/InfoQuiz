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
  if (mode === 'treino') return { color: '#ffffff', border: '#1e3a5f', icon: '⏱️' };
  if (streak >= 3) return { color: '#00e676', border: '#00e676', icon: '⚡' };
  if (lives === 1) return { color: '#ff9800', border: '#ff9800', icon: '🛡️' };
  if (timeLeft <= 5) return { color: '#ff1744', border: '#ff1744', icon: '⏱️' };
  return { color: '#ffffff', border: '#1e3a5f', icon: '⏱️' };
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
    return <Typography align="center" mt={10}>Carregando ambiente virtual...</Typography>;
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
      title: 'Abortar Missão',
      msg: 'Deseja sair no meio do teste? O progresso não será salvo.',
      onConfirm: () => setScreen('hub'),
      onCancel: resume,
    });
  };

  return (
    <Box className={isShaking ? 'anim-shake' : ''} mt={2}>
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #1e3a5f" pb={1.5} mb={1.5}>
          <Box>
            <Typography color="primary" fontWeight="bold" textTransform="uppercase" lineHeight={1.2}>{MODULE_NAMES[gameConfig.cat]}</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="bold">{data.avatar} Aluno: {data.nome}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Button variant="outlined" color="inherit" size="small" onClick={openPause}>⏸️</Button>
            <Button variant="outlined" color="error" size="small" onClick={requestExit}>Sair</Button>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          {gameConfig.mode !== 'treino' && (
            <Box bgcolor="#000" px={1.5} py={0.5} borderRadius={1} border="1px solid #333" fontSize="0.85rem">
              {lives > 0 ? '❤️'.repeat(lives) + '🖤'.repeat(3 - lives) : '☠️'}
            </Box>
          )}
          <Box bgcolor="#000" px={2} py={0.5} borderRadius={1} border="1px solid" sx={{ color: timer.color, borderColor: timer.border, fontWeight: 'bold' }}>
            {gameConfig.mode === 'treino' ? '∞' : `${timer.icon} ${timeLeft}s`}
          </Box>
          <Box bgcolor="#000" px={1.5} py={0.5} borderRadius={1} border="1px solid #00bcd4" color="#00bcd4" fontWeight="bold">⭐ {score}</Box>
          <Box bgcolor="#000" px={1.5} py={0.5} borderRadius={1} border="1px solid #1e3a5f" fontWeight="bold">Q. {currentIndex + 1}/{questions.length}</Box>
        </Box>
      </Paper>

      {gameConfig.mode === 'avaliacao' && (
        <Box display="flex" gap={1} mb={3}>
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: '#8a2be2', bgcolor: '#000', flex: 1, fontWeight: 'bold', opacity: powers.p5050 ? 0.5 : 1 }}
            disabled={powers.p5050 || isPaused || feedback}
            onClick={useFiftyFifty}
          >🌗 50/50</Button>
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: '#8a2be2', bgcolor: '#000', flex: 1, fontWeight: 'bold', opacity: powers.pTime ? 0.5 : 1 }}
            disabled={powers.pTime || isPaused || feedback}
            onClick={useExtraTime}
          >⏱️ +10s</Button>
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: '#8a2be2', bgcolor: '#000', flex: 1, fontWeight: 'bold', opacity: powers.pSkip ? 0.5 : 1 }}
            disabled={powers.pSkip || isPaused || feedback}
            onClick={skipQuestion}
          >⏭️ Pular</Button>
        </Box>
      )}

      <Paper sx={{ p: 3, textAlign: 'center', mb: 3, borderTop: '4px solid #00bcd4', bgcolor: '#000' }}>
        <Typography variant="h6" fontWeight={500}>{currentQuestion.q}</Typography>
      </Paper>

      <Grid container spacing={1.5}>
        {currentOptions.map((option) => {
          let buttonStyle = {
            p: 2,
            height: '100%',
            fontWeight: 'normal',
            bgcolor: '#0b131c',
            color: 'white',
            border: '1px solid #1e3a5f',
            textTransform: 'none',
            visibility: hiddenOptions.includes(option) ? 'hidden' : 'visible',
          };

          if (feedback) {
            if (option === currentQuestion.c) {
              buttonStyle = { ...buttonStyle, bgcolor: '#00e676', color: 'black', border: '1px solid white', transform: 'scale(1.05)', zIndex: 10, fontWeight: 'bold' };
            } else if (option === selectedOption) {
              buttonStyle = { ...buttonStyle, bgcolor: '#ff1744', color: 'white', opacity: 0.8 };
            }
          }

          return (
            <Grid item xs={12} sm={6} key={option}>
              <Button fullWidth sx={buttonStyle} onClick={() => handleAnswer(option)} disabled={feedback !== null}>{option}</Button>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={pauseDialogOpen}>
        <DialogTitle color="primary" fontWeight="bold" textTransform="uppercase">⏸️ Sistema Pausado</DialogTitle>
        <DialogContent><DialogContentText color="text.primary">O tempo está congelado. Respire fundo.</DialogContentText></DialogContent>
        <DialogActions><Button onClick={closePause} variant="contained" fullWidth sx={{ m: 1 }}>Retomar Teste</Button></DialogActions>
      </Dialog>

      <Dialog open={feedbackVisible} PaperProps={{ sx: { border: '2px solid', borderColor: feedbackCorrect ? '#00e676' : '#ff1744', bgcolor: '#0b131c', borderRadius: 3, p: 1 } }}>
        <Box p={2} textAlign="center">
          <Typography fontSize="3.5rem" mb={1} lineHeight={1}>{feedbackCorrect ? '✅' : '❌'}</Typography>
          <Typography variant="h5" fontWeight="bold" color={feedbackCorrect ? 'success.main' : 'error'} textTransform="uppercase" mb={2}>
            {feedbackCorrect ? 'Código Limpo!' : (selectedOption === null ? 'Timeout' : 'Erro de Sintaxe!')}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3} fontStyle="italic">&quot;{currentQuestion.q}&quot;</Typography>
          <Box bgcolor="#000" p={2} borderRadius={2} borderLeft={`4px solid ${feedbackCorrect ? '#00e676' : '#ff1744'}`} textAlign="left" mb={2}>
            <Typography variant="caption" color="text.secondary" textTransform="uppercase">A resposta correta é:</Typography>
            <Typography fontWeight="bold" fontSize="1.1rem" color="white">{currentQuestion.c}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={3}>{currentQuestion.d}</Typography>
          <Button variant="contained" color="primary" fullWidth onClick={nextQuestion}>Continuar</Button>
        </Box>
      </Dialog>
    </Box>
  );
}
