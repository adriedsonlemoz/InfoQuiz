import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { ACHIEVEMENTS } from '../../data/achievements.js';

export default function AchievementsScreen({ data, setScreen }) {
    // Verifica se todos os módulos estão desbloqueados (ou se ganhou o diploma)
    const isDiplomado = data.achievements.diplomado;

    return (
        <Box mt={2} textAlign="center">
            <Typography variant="h5" color="primary" align="center" fontWeight="bold">CONQUISTAS E DIPLOMA</Typography>
            <Typography variant="caption" color="text.secondary" align="center" display="block" mb={3}>Acompanhe marcos do curso e emita o diploma ao concluir os 12 módulos.</Typography>
            
            {/* BOTÃO DO DIPLOMA */}
            <Box mb={3}>
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={!isDiplomado}
                    onClick={() => setScreen('diploma')}
                    sx={{ 
                        p: 2, 
                        fontSize: '1rem', 
                        background: isDiplomado ? 'linear-gradient(45deg, #d4af37, #f1c40f)' : '#1a3043', 
                        color: isDiplomado ? '#000' : '#555',
                        border: isDiplomado ? 'none' : '1px dashed #555'
                    }}
                >
                    {isDiplomado ? '🎓 EMITIR DIPLOMA OFICIAL' : '🔒 DIPLOMA (CONCLUA OS 12 MÓDULOS)'}
                </Button>
            </Box>

            <Grid container spacing={1.5} mb={4} sx={{maxHeight: 280, overflowY: 'auto', pr: 1}}>
                {ACHIEVEMENTS.map(a => {
                    const isUn = data.achievements[a.id];
                    return (
                        <Grid item xs={12} sm={6} key={a.id}>
                            <Paper sx={{ p: 2, textAlign: 'center', height: '100%', border: '1px solid', borderColor: isUn ? 'primary.main' : 'rgba(148,197,229,0.22)', bgcolor: isUn ? 'rgba(56,189,248,0.07)' : '#183149' }}>
                                <Typography fontSize="2.5rem" sx={{ filter: isUn ? 'none' : 'grayscale(1)', opacity: isUn ? 1 : 0.3, transition: '0.3s' }}>{a.icon}</Typography>
                                <Typography variant="body2" fontWeight="bold" color={isUn ? 'primary.main' : 'text.secondary'} textTransform="uppercase" mt={1}>{a.name}</Typography>
                                <Typography variant="caption" color="text.secondary" display="block" mt={0.5} lineHeight={1.2}>{isUn ? a.desc : '🔒 Bloqueado'}</Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
            <Button variant="outlined" color="inherit" fullWidth onClick={()=>setScreen('hub')}>Voltar</Button>
        </Box>
    );
}

// TELA DO DIPLOMA (Visual Claro e Imprimível)
