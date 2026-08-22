import { useRef } from 'react';
import { Box, Button, Chip, Divider, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { MODULES } from '../../data/modules.js';
import { clearPlayerData, createPlayerBackup, parsePlayerBackup } from '../../storage/playerStorage.js';
import packageInfo from '../../../package.json';

export default function HubScreen({ data, setPlayerData, setScreen, setGameConfig, setAlertModal, setConfirmModal, onOpenCourse }) {
    const importInputRef = useRef(null);

    const goTo = (cat) => {
        if (!data.modulosDesbloqueados[cat]) return;
        setGameConfig({ cat, mode: 'avaliacao' });
        setScreen('vest');
    };

    const exportBackup = async () => {
        const backup = createPlayerBackup(data, packageInfo.version);
        const filename = `InfoQuiz-backup-${new Date().toISOString().slice(0, 10)}.json`;
        const file = new File([backup], filename, { type: 'application/json;charset=utf-8' });

        try {
            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({ title: 'Backup do InfoQuiz', files: [file] });
                setAlertModal({ show: true, title: 'Backup criado', msg: 'O arquivo de progresso foi preparado e compartilhado. Guarde uma cópia em local seguro.', color: '#4ade80' });
                return;
            }
        } catch (error) {
            if (error?.name === 'AbortError') return;
        }

        const url = URL.createObjectURL(file);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        setAlertModal({ show: true, title: 'Backup criado', msg: 'O progresso foi exportado em formato JSON. Guarde o arquivo em um local seguro.', color: '#4ade80' });
    };

    const importBackup = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;
        try {
            const restored = parsePlayerBackup(await file.text());
            setPlayerData(restored);
            setAlertModal({ show: true, title: 'Backup restaurado', msg: 'Seu progresso foi importado e validado com sucesso.', color: '#4ade80' });
        } catch (error) {
            setAlertModal({ show: true, title: 'Backup inválido', msg: error.message || 'Não foi possível importar este arquivo.', color: '#fb7185' });
        }
    };

    return (
        <Box mt={{ xs: 4.5, sm: 5 }}>
            <Typography variant="h5" color="primary" fontWeight="bold" align="center">Painel de aprendizado</Typography>
            <Typography variant="caption" color="text.secondary" display="block" align="center" mb={3}>Aluno: {data.nome} • v{packageInfo.version}</Typography>

            <Paper
                sx={{
                    p: 2, mb: 3,
                    background: 'linear-gradient(135deg, rgba(22,101,52,0.62), rgba(30,64,89,0.92))',
                    border: '1px solid rgba(74,222,128,0.75)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    '&:hover': { borderColor: '#86efac', transform: 'translateY(-2px)' },
                    transition: '0.2s'
                }}
                onClick={onOpenCourse}
            >
                <Typography fontSize="2.3rem" mb={0.5}>📖</Typography>
                <Typography variant="h6" color="success.main" fontWeight="bold">Material de estudo</Typography>
                <Typography variant="body2" color="text.secondary">Revise a teoria e os exemplos antes das avaliações.</Typography>
            </Paper>

            <Grid container spacing={1.5} mb={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, background: 'linear-gradient(135deg, rgba(91,33,182,0.55), rgba(30,64,89,0.9))', border: '1px solid rgba(167,139,250,0.7)', cursor: 'pointer' }} onClick={() => {
                        if (data.revisao.length === 0) setAlertModal({ show: true, title: 'Revisão em dia', msg: 'Você não tem questões erradas pendentes para revisar.', color: '#4ade80' });
                        else { setGameConfig({ cat: 'revisao', mode: 'treino' }); setScreen('game'); }
                    }}>
                        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                            <Typography fontSize="2.3rem">🧠</Typography>
                            <Box>
                                <Typography fontWeight="bold" fontSize="1.05rem">Revisar erros</Typography>
                                <Chip size="small" color={data.revisao.length ? 'error' : 'success'} label={`${data.revisao.length} pendentes`} sx={{ fontWeight: 'bold', mt: 0.5 }} />
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
                            <Paper sx={{ p: 1.7, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 0.8, height: '100%', cursor: aberto ? 'pointer' : 'not-allowed', opacity: aberto ? 1 : 0.48, border: progress?.completed ? '1px solid rgba(74,222,128,0.8)' : aberto ? '1px solid rgba(148,197,229,0.28)' : '1px dashed rgba(148,197,229,0.2)', ...(aberto && { '&:hover': { borderColor: progress?.completed ? '#86efac' : 'primary.main', bgcolor: 'rgba(56,189,248,0.07)' } }) }} onClick={() => goTo(mod.id)}>
                                <Typography fontSize="1.9rem">{aberto ? mod.icon : '🔒'}</Typography>
                                <Box width="100%">
                                    <Typography variant="body2" fontWeight="bold" lineHeight={1.2} mb={0.5}>{mod.label}</Typography>
                                    <Typography variant="caption" color="text.secondary" display="block">Módulo {index + 1}</Typography>
                                    {aberto && (
                                        <Box mt={1}>
                                            <Chip size="small" color={progress?.completed ? 'success' : progress?.attempts > 0 ? 'warning' : 'default'} label={progress?.completed ? 'Concluído' : progress?.attempts > 0 ? 'Em progresso' : 'Não avaliado'} sx={{ fontSize: '0.65rem', height: 22 }} />
                                            {hasScore && (
                                                <>
                                                    <Box display="flex" justifyContent="space-between" mt={1} mb={0.4}>
                                                        <Typography variant="caption" color="text.secondary">Melhor</Typography>
                                                        <Typography variant="caption" fontWeight="bold">{bestPercentage}%</Typography>
                                                    </Box>
                                                    <LinearProgress variant="determinate" value={bestPercentage} color={progress?.completed ? 'success' : 'primary'} sx={{ height: 5, borderRadius: 3 }} />
                                                </>
                                            )}
                                            {progress?.attempts > 0 && <Typography variant="caption" color="text.secondary" display="block" mt={0.7}>{progress.attempts} {progress.attempts === 1 ? 'tentativa' : 'tentativas'}</Typography>}
                                        </Box>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}

                <Grid item xs={6}><Paper sx={{ p: 2, textAlign: 'center', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }} onClick={() => setScreen('achievements')}><Typography fontSize="2rem">🏅</Typography><Typography variant="caption" fontWeight="bold" display="block" mt={1}>Conquistas</Typography></Paper></Grid>
                <Grid item xs={6}><Paper sx={{ p: 2, textAlign: 'center', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }} onClick={() => setScreen('stats')}><Typography fontSize="2rem">📊</Typography><Typography variant="caption" fontWeight="bold" display="block" mt={1}>Estatísticas</Typography></Paper></Grid>
            </Grid>

            <Divider sx={{ my: 2, borderColor: 'rgba(148,197,229,0.2)' }} />

            <input ref={importInputRef} type="file" accept="application/json,.json" hidden onChange={importBackup} />
            <Grid container spacing={1}>
                <Grid item xs={6}><Button variant="outlined" color="primary" fullWidth onClick={exportBackup}>💾 Exportar</Button></Grid>
                <Grid item xs={6}><Button variant="outlined" color="primary" fullWidth onClick={() => importInputRef.current?.click()}>📥 Importar</Button></Grid>
                <Grid item xs={6}><Button variant="outlined" color="inherit" fullWidth onClick={() => setScreen('about')}>ℹ️ Ajuda</Button></Grid>
                <Grid item xs={6}><Button variant="outlined" color="error" fullWidth onClick={() => setConfirmModal({ show: true, title: 'Zerar progresso', msg: 'Apagar permanentemente todo o progresso deste dispositivo?', onConfirm: () => { clearPlayerData(); window.location.reload(); } })}>🔄 Zerar</Button></Grid>
            </Grid>
        </Box>
    );
}
