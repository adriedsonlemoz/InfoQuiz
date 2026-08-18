import { useEffect } from 'react';
import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { MODULES } from '../../data/modules.js';
import { recordModuleEvaluation } from '../../progress/moduleProgress.js';

export default function ResultScreen({ data, setPlayerData, setScreen, gameConfig, gameResults, setGameResults, triggerAchievement, playAudio }) {
    const { score, maxScore, vidas } = gameResults;
    const isAvaliacao = gameConfig.mode === 'avaliacao';
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const isApproved = vidas > 0 && percentage >= 60;

    useEffect(() => {
        if (!isAvaliacao || gameResults.finalized || gameConfig.cat === 'revisao') return;

        const wasFirstEvaluation = data.stats.partidasJogadas === 0;
        const evaluationsAfterThis = data.stats.partidasJogadas + 1;
        const playedAt = Date.now();

        setPlayerData(p => {
            const unlocked = { ...p.modulosDesbloqueados };
            if (isApproved) {
                const currentIndex = MODULES.findIndex(m => m.id === gameConfig.cat);
                if (currentIndex !== -1 && currentIndex + 1 < MODULES.length) {
                    unlocked[MODULES[currentIndex + 1].id] = true;
                }
            }

            return {
                ...p,
                stats: { ...p.stats, partidasJogadas: p.stats.partidasJogadas + 1 },
                modulosDesbloqueados: unlocked,
                moduleProgress: recordModuleEvaluation(p.moduleProgress, gameConfig.cat, {
                    score,
                    maxScore,
                    percentage,
                    approved: isApproved,
                    playedAt,
                }),
            };
        });

        if (isApproved) {
            playAudio('snd-vitoria');
            if (wasFirstEvaluation) triggerAchievement('primeiro_bit');
            if (vidas === 1) triggerAchievement('sobrevivente');
            if (percentage === 100) triggerAchievement('full_stack');
            const currentIndex = MODULES.findIndex(m => m.id === gameConfig.cat);
            if (currentIndex === MODULES.length - 1) triggerAchievement('diplomado');
        }
        if (evaluationsAfterThis >= 10) triggerAchievement('veterano');

        // Marca a sessão como processada para não contar a mesma prova duas vezes
        // quando o usuário abre o gabarito e retorna ao resultado.
        setGameResults((current) => ({ ...current, finalized: true }));
    }, []);

    let titleColor = isApproved ? '#00e676' : '#ff1744';
    if (!isAvaliacao) titleColor = '#00bcd4';
    if (gameConfig.cat === 'revisao') titleColor = '#8a2be2';

    let msg = isApproved ? 'APROVADO!' : 'REPROVADO.';
    let subMsg = isApproved ? 'Módulo concluído com sucesso.' : 'Tente revisar o material e faça novamente.';

    if (!isAvaliacao) { msg = 'FIM DA PRÁTICA'; subMsg = 'Belo treino! Pronto para a avaliação?'; }
    if (gameConfig.cat === 'revisao') { msg = 'MEMÓRIA ATUALIZADA'; subMsg = 'Erros revisados!'; }
    if (vidas <= 0 && isAvaliacao) { msg = 'FALHA NO SISTEMA'; subMsg = 'Você perdeu todas as vidas antes de concluir.'; }

    return (
        <Box mt={3} textAlign="center">
            <Typography variant="h5" color="text.secondary" fontWeight="bold" mb={2}>RELATÓRIO DO MÓDULO</Typography>

            <Paper sx={{ p: 4, mb: 4, bgcolor: 'rgba(0,0,0,0.6)', border: '2px solid', borderColor: titleColor, boxShadow: `0 0 20px ${titleColor}40` }}>
                <Typography fontSize="3rem" mb={2}>{isApproved || !isAvaliacao ? '🎓' : '📉'}</Typography>
                <Typography variant="h4" fontWeight="bold" textTransform="uppercase" sx={{color: titleColor}} mb={1}>{msg}</Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>{subMsg}</Typography>

                <Box bgcolor="#0b131c" p={2} borderRadius={2} border="1px solid #1e3a5f" mb={2}>
                    <Typography variant="caption" color="text.secondary" textTransform="uppercase">Pontuação Obtida</Typography>
                    <Typography variant="h3" fontWeight="bold" color="white">{score} <span style={{fontSize:'1rem', color:'#888'}}>/ {maxScore}</span></Typography>

                    <Box mt={2} display="flex" alignItems="center" gap={2}>
                        <LinearProgress variant="determinate" value={percentage} color={isApproved ? 'success' : 'error'} sx={{ flex: 1, height: 10, borderRadius: 5 }} />
                        <Typography fontWeight="bold">{percentage}%</Typography>
                    </Box>
                </Box>
            </Paper>

            <Button variant="outlined" color="primary" fullWidth sx={{mb:1.5}} onClick={()=>setScreen('review')}>📋 Ver Gabarito Completo</Button>
            <Button variant="contained" color="primary" fullWidth sx={{mb:1.5}} onClick={()=>setScreen('hub')}>🏠 Voltar ao Painel</Button>
        </Box>
    );
}
