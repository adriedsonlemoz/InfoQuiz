import { Box, Button, Chip, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { MODULES } from '../../data/modules.js';
import { getCompletedModuleCount } from '../../progress/moduleProgress.js';

export default function StatsScreen({ data, setScreen }) {
    const totalAnswers = data.stats.acertos + data.stats.erros;
    const hitRate = totalAnswers > 0 ? (data.stats.acertos / totalAnswers) : 0;
    const logic = Math.round(50 + (hitRate * 45) + Math.min(data.stats.partidasJogadas, 4));
    const theory = Math.round(hitRate * 99) || 50;
    const completedModules = getCompletedModuleCount(data.moduleProgress);
    const unlockedModules = Object.values(data.modulosDesbloqueados).filter(Boolean).length;
    const coursePercentage = Math.round((completedModules / MODULES.length) * 100);
    const xp = data.stats.partidasJogadas * 50;

    return (
        <Box mt={2} textAlign="center">
            <Typography variant="h5" color="primary" fontWeight="bold" mb={3}>CREDENCIAL TECH</Typography>

            <Box className="card-shine" sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#0b131c', border: '1px solid #00bcd4', borderRadius: 2, p: 3, mb: 4, boxShadow: '0 4px 15px rgba(0,188,212,0.2)' }}>
                <Box position="absolute" top={10} right={15} fontSize="1.5rem">🔐</Box>
                <Box fontSize="4rem" mt={1} sx={{filter:'drop-shadow(0 0px 5px rgba(0,188,212,0.5))'}}>{data.avatar}</Box>
                <Typography variant="h6" fontWeight="bold" color="white" textTransform="uppercase" borderBottom="1px solid #1e3a5f" pb={0.5} mt={1}>{data.nome}</Typography>
                <Typography variant="caption" color="primary" display="block" mb={2}>Analista em Treinamento</Typography>

                <Grid container spacing={1} sx={{fontSize:'0.85rem', fontWeight:'bold', textAlign: 'left', bgcolor: '#000', p: 1.5, borderRadius: 1}}>
                    <Grid item xs={6} display="flex" justifyContent="space-between"><span style={{color: '#90caf9'}}>LÓGICA</span><span style={{color:'white'}}>{logic}</span></Grid>
                    <Grid item xs={6} display="flex" justifyContent="space-between"><span style={{color: '#90caf9'}}>TEORIA</span><span style={{color:'white'}}>{theory}</span></Grid>
                    <Grid item xs={6} display="flex" justifyContent="space-between"><span style={{color: '#90caf9'}}>CONCLUÍDOS</span><span style={{color:'white'}}>{completedModules}/{MODULES.length}</span></Grid>
                    <Grid item xs={6} display="flex" justifyContent="space-between"><span style={{color: '#90caf9'}}>XP</span><span style={{color:'white'}}>{xp}</span></Grid>
                </Grid>
            </Box>

            <Paper sx={{p:2, mb:3, textAlign:'left', bgcolor:'#0b131c', border:'1px solid #1e3a5f'}}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight="bold">Progresso do curso</Typography>
                        <Typography variant="body2" fontWeight="bold">{completedModules} concluídos • {unlockedModules} desbloqueados</Typography>
                    </Box>
                    <Typography variant="h6" color="primary" fontWeight="bold">{coursePercentage}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={coursePercentage} color={coursePercentage === 100 ? 'success' : 'primary'} sx={{height:9, borderRadius:5}} />
            </Paper>

            <Grid container spacing={2} mb={4}>
                <Grid item xs={6}><Paper sx={{p:1.5}}><Typography variant="caption" color="text.secondary" display="block" textTransform="uppercase" fontWeight="bold">Avaliações Feitas</Typography><Typography variant="h5" fontWeight="bold" color="primary">{data.stats.partidasJogadas}</Typography></Paper></Grid>
                <Grid item xs={6}><Paper sx={{p:1.5}}><Typography variant="caption" color="text.secondary" display="block" textTransform="uppercase" fontWeight="bold">Taxa de Acerto</Typography><Typography variant="h5" fontWeight="bold">{Math.round(hitRate*100)}%</Typography></Paper></Grid>
                <Grid item xs={6}><Paper sx={{p:1.5}}><Typography variant="caption" color="text.secondary" display="block" textTransform="uppercase" fontWeight="bold">Acertos</Typography><Typography variant="h5" fontWeight="bold" color="success.main">{data.stats.acertos}</Typography></Paper></Grid>
                <Grid item xs={6}><Paper sx={{p:1.5}}><Typography variant="caption" color="text.secondary" display="block" textTransform="uppercase" fontWeight="bold">Erros</Typography><Typography variant="h5" fontWeight="bold" color="error">{data.stats.erros}</Typography></Paper></Grid>
            </Grid>

            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" textTransform="uppercase" textAlign="left" mb={1.5}>Desempenho por módulo</Typography>
            <Grid container spacing={1.5} mb={4}>
                {MODULES.map((module, index) => {
                    const progress = data.moduleProgress?.[module.id];
                    const hasScore = Number.isFinite(progress?.bestPercentage);
                    const unlocked = data.modulosDesbloqueados[module.id];

                    return (
                        <Grid item xs={12} key={module.id}>
                            <Paper sx={{p:1.5, textAlign:'left', opacity: unlocked ? 1 : 0.55, border: progress?.completed ? '1px solid #00e676' : '1px solid #1e3a5f'}}>
                                <Box display="flex" alignItems="center" gap={1.2}>
                                    <Typography fontSize="1.6rem">{unlocked ? module.icon : '🔒'}</Typography>
                                    <Box flex={1} minWidth={0}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                                            <Box minWidth={0}>
                                                <Typography variant="body2" fontWeight="bold" noWrap>{index + 1}. {module.label}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {!unlocked
                                                        ? 'Bloqueado'
                                                        : progress?.attempts > 0
                                                            ? `${progress.attempts} ${progress.attempts === 1 ? 'tentativa' : 'tentativas'} • melhor ${progress.bestPercentage}%`
                                                            : progress?.importedFromLegacy
                                                                ? 'Concluído em versão anterior'
                                                                : 'Nenhuma avaliação registrada'}
                                                </Typography>
                                            </Box>
                                            <Chip size="small" color={progress?.completed ? 'success' : progress?.attempts > 0 ? 'warning' : 'default'} label={progress?.completed ? 'Concluído' : unlocked ? 'Pendente' : 'Bloqueado'} sx={{fontSize:'0.65rem'}} />
                                        </Box>
                                        {hasScore && <LinearProgress variant="determinate" value={progress.bestPercentage} color={progress.completed ? 'success' : 'primary'} sx={{height:5, borderRadius:3, mt:1}} />}
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>

            <Button variant="outlined" color="inherit" fullWidth onClick={()=>setScreen('hub')}>Voltar ao Painel</Button>
        </Box>
    );
}
