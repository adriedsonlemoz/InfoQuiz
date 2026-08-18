import { Box, Button, Grid, Paper, Typography } from '@mui/material';

export default function DiplomaScreen({ data, setScreen }) {
    const dataHoje = new Date().toLocaleDateString('pt-BR');

    return (
        <Box mt={2}>
            <Box className="no-print" mb={2} textAlign="center">
                <Typography variant="h5" color="secondary" fontWeight="bold" mb={1}>PARABÉNS!</Typography>
                <Typography variant="body2" color="text.secondary">Seu certificado está pronto. Tire um print ou salve em PDF.</Typography>
            </Box>

            {/* ÁREA DE IMPRESSÃO (O DIPLOMA) */}
            <Paper 
                className="print-area" 
                sx={{ 
                    p: {xs: 3, sm: 5}, 
                    bgcolor: '#fdfdfd', 
                    color: '#000', 
                    border: '12px solid #1e3a5f', 
                    outline: '3px solid #d4af37', 
                    outlineOffset: '-10px', 
                    textAlign: 'center', 
                    position: 'relative',
                    mb: 4
                }}
            >
                <Typography variant="h4" sx={{ fontFamily: 'Georgia, serif', color: '#1e3a5f', fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}>
                    Certificado de Conclusão
                </Typography>
                
                <Typography variant="subtitle1" sx={{ color: '#555', mb: 3, fontStyle: 'italic' }}>
                    Certificamos orgulhosamente que
                </Typography>
                
                <Typography variant="h3" sx={{ fontFamily: 'Georgia, serif', color: '#d4af37', fontWeight: 'bold', borderBottom: '2px solid #ccc', display: 'inline-block', px: 3, mb: 4 }}>
                    {data.nome}
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#333', mb: 5, px: {xs: 0, sm: 2}, fontSize: '1.1rem', lineHeight: 1.6 }}>
                    Concluiu com êxito a <strong>Trilha de Aprendizado Tecnológico InfoQuiz</strong>, demonstrando alta proficiência nos 12 módulos da formação, incluindo Hardware, Sistemas Operacionais, Redes, Segurança da Informação, Nuvem e Lógica de Programação.
                </Typography>
                
                <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={2}>
                    <Box textAlign="center">
                        <Typography variant="body1" sx={{ borderBottom: '1px solid #000', px: 2, mb: 0.5, color: '#000', fontWeight: 'bold' }}>{dataHoje}</Typography>
                        <Typography variant="caption" sx={{ color: '#555' }}>Data de Emissão</Typography>
                    </Box>
                    
                    <Box fontSize="3.5rem" lineHeight={1}>
                        🥇
                    </Box>
                    
                    <Box textAlign="center">
                        <Typography variant="body1" sx={{ borderBottom: '1px solid #000', px: 2, mb: 0.5, color: '#000', fontFamily: 'monospace', fontWeight: 'bold' }}>InfoQuiz LMS</Typography>
                        <Typography variant="caption" sx={{ color: '#555' }}>Direção Acadêmica</Typography>
                    </Box>
                </Box>
            </Paper>

            <Grid container spacing={2} className="no-print">
                <Grid item xs={6}>
                    <Button variant="outlined" color="inherit" fullWidth onClick={()=>setScreen('achievements')}>Voltar</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" fullWidth onClick={()=>window.print()}>🖨️ Salvar PDF</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

