import { Box, Button, Chip, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { MODULE_NAMES, MODULES } from '../../data/modules.js';
import { consumeEnergy } from '../../energy/energy.js';

export default function ModuleStartScreen({ data, setPlayerData, setScreen, gameConfig, setGameConfig, setAlertModal }) {
    const progress = data.moduleProgress?.[gameConfig.cat];
    const hasBestScore = Number.isFinite(progress?.bestPercentage);

    const play = () => {
        if(gameConfig.mode === 'avaliacao') {
            if(data.energia <= 0) { setAlertModal({show:true, title:'Bateria Fraca', msg:'Sem energia (bateria) suficiente! Aguarde ou estude no modo Prática.', color:'#ff9800'}); return; }
            setPlayerData((player) => consumeEnergy(player));
        }
        setScreen('game');
    };

    return (
        <Box mt={3} textAlign="center">
            <Typography fontSize="3.5rem" mb={1}>{MODULES.find(m => m.id === gameConfig.cat)?.icon || '📚'}</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold" textTransform="uppercase" mb={1}>{MODULE_NAMES[gameConfig.cat]}</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>Prepare-se para o teste de conhecimentos.</Typography>

            {progress && (
                <Paper sx={{p:2, mb:3, bgcolor:'rgba(24,49,73,0.92)', border:'1px solid rgba(148,197,229,0.25)'}}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} mb={hasBestScore ? 1.5 : 0}>
                        <Box textAlign="left">
                            <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight="bold">Seu progresso</Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {progress.attempts > 0 ? `${progress.attempts} ${progress.attempts === 1 ? 'tentativa' : 'tentativas'}` : progress.importedFromLegacy ? 'Histórico anterior' : 'Nenhuma avaliação'}
                            </Typography>
                        </Box>
                        <Chip size="small" color={progress.completed ? 'success' : progress.attempts > 0 ? 'warning' : 'default'} label={progress.completed ? 'Concluído' : progress.attempts > 0 ? 'Em progresso' : 'Pendente'} />
                    </Box>

                    {hasBestScore && (
                        <Box>
                            <Box display="flex" justifyContent="space-between" mb={0.5}>
                                <Typography variant="body2" color="text.secondary">Melhor nota</Typography>
                                <Typography variant="body2" fontWeight="bold">{progress.bestScore ?? 0}/50 • {progress.bestPercentage}%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={progress.bestPercentage} color={progress.completed ? 'success' : 'primary'} sx={{height:8, borderRadius:4}} />
                            {Number.isFinite(progress.lastPercentage) && <Typography variant="caption" color="text.secondary" display="block" mt={1}>Última tentativa: {progress.lastPercentage}%</Typography>}
                        </Box>
                    )}
                </Paper>
            )}

            <Paper sx={{p: 0.5, display:'flex', gap:1, mb:4, bgcolor: 'rgba(7,19,29,0.42)'}}>
                <Button fullWidth variant={gameConfig.mode==='avaliacao'?'contained':'text'} color={gameConfig.mode==='avaliacao'?'primary':'inherit'} onClick={()=>setGameConfig(p=>({...p, mode:'avaliacao'}))}>📝 Avaliação (Valendo Nota)</Button>
                <Button fullWidth variant={gameConfig.mode==='treino'?'contained':'text'} color={gameConfig.mode==='treino'?'success':'inherit'} onClick={()=>setGameConfig(p=>({...p, mode:'treino'}))}>📖 Prática (Estudo livre)</Button>
            </Paper>

            <Paper sx={{ p:2, mb:4, bgcolor: 'rgba(24,49,73,0.92)', borderLeft: '4px solid #38bdf8', textAlign: 'left' }}>
                <Typography variant="subtitle2" fontWeight="bold" mb={1}>Instruções:</Typography>
                <Typography variant="body2" color="text.secondary">• Modo Avaliação consome 1 barra de Bateria.</Typography>
                <Typography variant="body2" color="text.secondary">• Você começa com 3 vidas.</Typography>
                <Typography variant="body2" color="text.secondary">• A prova sorteia 5 questões entre 15 disponíveis neste módulo.</Typography>
                <Typography variant="body2" color="text.secondary">• É necessário obter pelo menos 60% e terminar com vidas para concluir o módulo.</Typography>
            </Paper>

            <Grid container spacing={2}>
                <Grid item xs={6}><Button variant="outlined" color="inherit" fullWidth size="large" onClick={()=>setScreen('hub')}>Voltar</Button></Grid>
                <Grid item xs={6}><Button variant="contained" color="primary" fullWidth size="large" onClick={play}>Iniciar Teste</Button></Grid>
            </Grid>
        </Box>
    );
}
