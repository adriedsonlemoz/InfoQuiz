import { Box, Button, Chip, Divider, Paper, Typography } from '@mui/material';

function getAnswerStatus(answer) {
  if (!answer) return { label: 'Não respondida', color: 'default' };
  if (answer.skipped) return { label: 'Pulada', color: 'warning' };
  if (answer.timedOut) return { label: 'Tempo esgotado', color: 'warning' };
  if (answer.isCorrect) return { label: 'Correta', color: 'success' };
  return { label: 'Incorreta', color: 'error' };
}

export default function ReviewScreen({ gameResults, setScreen }) {
  if (!gameResults) return <Button onClick={() => setScreen('hub')}>Voltar</Button>;

  const answers = Array.isArray(gameResults.answers) ? gameResults.answers : [];

  return (
    <Box mt={2}>
      <Typography variant="h5" color="primary" align="center" fontWeight="bold" mb={3}>GABARITO E EXPLICAÇÕES</Typography>
      <Box sx={{ maxHeight: '65vh', overflowY: 'auto', pr: 1, mb: 3 }}>
        {gameResults.questions.map((question, index) => {
          const answer = answers[index];
          const status = getAnswerStatus(answer);
          const selectedText = answer?.selectedAnswer || (answer?.skipped ? 'Questão pulada' : answer?.timedOut ? 'Nenhuma — tempo esgotado' : 'Não registrada');

          return (
            <Paper key={`${question.q}-${index}`} sx={{ p: 2, mb: 2, borderLeft: '4px solid #38bdf8', bgcolor: 'rgba(24,49,73,0.94)' }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1} mb={1}>
                <Typography fontWeight="500">{index + 1}. {question.q}</Typography>
                {answers.length > 0 && <Chip label={status.label} color={status.color} size="small" />}
              </Box>

              {answers.length > 0 && (
                <Typography
                  variant="body2"
                  color={answer?.isCorrect ? 'success.main' : 'text.secondary'}
                  mb={1}
                >
                  Sua resposta: <strong>{selectedText}</strong>
                </Typography>
              )}

              <Typography color="success.main" variant="body2" fontWeight="bold" mb={1}>✅ Resposta correta: {question.c}</Typography>
              <Divider sx={{ my: 1, borderColor: 'rgba(148,197,229,0.2)' }} />
              <Typography variant="caption" color="text.secondary">{question.d}</Typography>
            </Paper>
          );
        })}
      </Box>
      <Button variant="contained" fullWidth onClick={() => setScreen('end')}>Voltar ao Resultado</Button>
    </Box>
  );
}
