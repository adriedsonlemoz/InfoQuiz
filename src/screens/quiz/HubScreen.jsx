import { Box, Button, Chip, Divider, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { MODULES } from '../../data/modules.js';
import { clearPlayerData } from '../../storage/playerStorage.js';

export default function HubScreen({ data, setScreen, setGameConfig, setAlertModal, setConfirmModal, onOpenCourse }) {
    const goTo = (cat) => {
        if(!data.modulosDesbloqueados[cat]) return;
        setGameConfig({ cat, mode: 'avaliacao' }); setScreen('vest');
    };

    return (
        <Box mt={5}>
            <Typography variant="h5" color="primary" fontWeight="bold" align="center" textTransform="uppercase">Painel de Controle</Typography>
            <Typography variant="caption" color="text.secondary" display="block" align="center" mb={3} textTransform="uppercase">Usuário: {data.nome}</Typography>

            <Paper
                sx={{
                    p: 2, mb: 3,
                    background: 'linear-gradient(45deg, #004d40, #0b131c)',
                    border: '1px solid #00e676',
                    cursor: 'pointer',
                    textAlign: 'center',
                    '&:hover': { borderColor: '#69f0ae', transform: 'scale(1.02)' },
                    transition: '0.2s'
                }}
                onClick={onOpenCourse}
            >
                <Typography fontSize="2.5rem" mb={1}>📖</Typography>
                <Typography variant="h6" color="success.main" fontWeight="bold" textTransform="uppercase">Material de Estudo</Typography>
                <Typography variant="body2" color="text.secondary">Leia a teoria antes de fazer as avaliações</Typography>
            </Paper>

            <Grid container spacing={1.5} mb={3}>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, background: 'linear-gradient(45deg, #4a148c, #111)', border: '1px solid #9b59b6', cursor: 'pointer', ...(data.revisao.length > 0 && {'&:hover':{borderColor:'#b070cc'}}) }} onClick={() => {
                        if(data.revisao.length === 0) setAlertModal({show:true, title:'Memória Limpa!', msg:'Você não tem nenhum erro gravado para revisar.', color:'#00e676'});
                        else { setGameConfig({cat:'revisao', mode:'treino'}); setScreen('game'); }
                    }}>
                        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                            <Typography fontSize="2.5rem">🧠</Typography>
                            <Box>
                                <Typography fontWeight="bold" fontSize="1.1rem">Revisar Erros</Typography>
                                <Chip size="small" color="error" label={`${data.revisao.length} pendentes`} sx={{fontWeight:'bold', mt:0.5}}/>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {MODULES.map((mod, index) => {
                    const aberto = data.modulosDesbloqueados[mod.id];
                    const progress = data.moduleProgress?.[mod.id];
                    const bestPercentage = progress?.bestPercentage;
                    const hasScore = Number.isFinite(bestPercentage);

                    return (
                        <Grid item xs={6} key={mod.id}>
                            <Paper sx={{p: 2, display:'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1, height: '100%', cursor: aberto ? 'pointer' : 'not-allowed', opacity: aberto ? 1 : 0.5, border: progress?.completed ? '1px solid #00e676' : aberto ? '1px solid #1e3a5f' : '1px dashed #333', ...(aberto && {'&:hover': {borderColor: progress?.completed ? '#69f0ae' : 'primary.main', bgcolor: 'rgba(0,188,212,0.05)'}}) }} onClick={()=>goTo(mod.id)}>
                                <Typography fontSize="2rem">{aberto ? mod.icon : '🔒'}</Typography>
                                <Box width="100%">
                                    <Typography variant="body2" fontWeight="bold" lineHeight={1.2} mb={0.5}>{mod.label}</Typography>
                                    <Typography variant="caption" color="text.secondary" display="block">Módulo {index + 1}</Typography>

                                    {aberto && (
                                        <Box mt={1}>
                                            <Chip
                                                size="small"
                                                color={progress?.completed ? 'success' : progress?.attempts > 0 ? 'warning' : 'default'}
                                                label={progress?.completed ? 'Concluído' : progress?.attempts > 0 ? 'Em progresso' : 'Não avaliado'}
                                                sx={{fontSize:'0.65rem', height:22}}
                                            />
                                            {hasScore && (
                                                <>
                                                    <Box display="flex" justifyContent="space-between" mt={1} mb={0.4}>
                                                        <Typography variant="caption" color="text.secondary">Melhor</Typography>
                                                        <Typography variant="caption" fontWeight="bold">{bestPercentage}%</Typography>
                                                    </Box>
                                                    <LinearProgress variant="determinate" value={bestPercentage} color={progress?.completed ? 'success' : 'primary'} sx={{height:5, borderRadius:3}} />
                                                </>
                                            )}
                                            {progress?.attempts > 0 && <Typography variant="caption" color="text.secondary" display="block" mt={0.7}>{progress.attempts} {progress.attempts === 1 ? 'tentativa' : 'tentativas'}</Typography>}
                                            {progress?.importedFromLegacy && !hasScore && <Typography variant="caption" color="text.secondary" display="block" mt={0.7}>Histórico anterior importado</Typography>}
                                        </Box>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}

                <Grid item xs={6}><Paper sx={{p: 2, textAlign:'center', cursor:'pointer', '&:hover':{borderColor: 'primary.main'}}} onClick={()=>setScreen('achievements')}><Typography fontSize="2.2rem">🏅</Typography><Typography variant="caption" fontWeight="bold" display="block" mt={1}>Certificados</Typography></Paper></Grid>
                <Grid item xs={6}><Paper sx={{p: 2, textAlign:'center', cursor:'pointer', '&:hover':{borderColor: 'primary.main'}}} onClick={()=>setScreen('stats')}><Typography fontSize="2.2rem">📊</Typography><Typography variant="caption" fontWeight="bold" display="block" mt={1}>Estatísticas</Typography></Paper></Grid>
            </Grid>

            <Divider sx={{my:2, borderColor: '#333'}} />

            <Grid container spacing={1}>
                <Grid item xs={6}><Button variant="outlined" color="primary" fullWidth sx={{py:1.5, display:'flex', flexDirection:'column'}} onClick={()=>setScreen('about')}><span style={{fontSize:'1.2rem', marginBottom:'2px'}}>ℹ️</span> <span style={{fontSize:'0.65rem'}}>Ajuda</span></Button></Grid>
                <Grid item xs={6}><Button variant="outlined" color="error" fullWidth sx={{py:1.5, display:'flex', flexDirection:'column'}} onClick={()=>setConfirmModal({show:true, title:'Resetar Sistema', msg:'Apagar todo o progresso do seu curso?', onConfirm:()=>{clearPlayerData(); window.location.reload();}})}><span style={{fontSize:'1.2rem', marginBottom:'2px'}}>🔄</span> <span style={{fontSize:'0.65rem'}}>Zerar</span></Button></Grid>
            </Grid>
        </Box>
    );
}
