import { Box, Button, Paper, Typography } from '@mui/material';

export default function AboutScreen({ setScreen, setAlertModal }) {
    return (
        <Box mt={2}>
            <Typography variant="h5" color="primary" align="center" fontWeight="bold" mb={3}>CENTRAL DE AJUDA</Typography>
            <Box sx={{maxHeight: '60vh', overflowY: 'auto', pr:1, mb: 3}}>
                <Paper sx={{p:2, mb:2}}>
                    <Typography variant="subtitle2" color="primary" textTransform="uppercase" borderBottom="1px solid #1e3a5f" pb={1} mb={2}>📖 Perguntas Frequentes</Typography>
                    <Box mb={2}><Typography variant="body2" color="white" fontWeight="bold">Como libero o próximo módulo?</Typography><Typography variant="caption" color="text.secondary">Faça o módulo anterior no modo "Avaliação" e tire mais de 60% de nota para destravar a próxima fase.</Typography></Box>
                    <Box mb={2}><Typography variant="body2" color="white" fontWeight="bold">O que é a Bateria (Energia)?</Typography><Typography variant="caption" color="text.secondary">Avaliações gastam 1 de bateria. Ela recarrega sozinha. Se a bateria acabar, continue estudando no modo Prática (gratuito).</Typography></Box>
                    <Box mb={2}><Typography variant="body2" color="white" fontWeight="bold">Como funciona a Revisão?</Typography><Typography variant="caption" color="text.secondary">Toda questão que você erra é salva na memória. Estude-as no menu "Revisar Erros". Acertá-las apaga o erro do registro.</Typography></Box>
                </Paper>
                <Paper sx={{p:2, mb:2, textAlign:'center'}}>
                    <Typography variant="subtitle2" color="primary" textTransform="uppercase" mb={1}>💚 Apoie o Projeto</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" mb={2}>Este curso é gratuito. Ajude o desenvolvedor!</Typography>
                    <Box p={1.5} bgcolor="#000" border="1px dashed #00bcd4" color="#00bcd4" borderRadius={2} mb={2} fontFamily="monospace">contato@infoquiz.com</Box>
                    <Button variant="outlined" color="primary" size="small" onClick={async()=>{
                        try {
                            await navigator.clipboard.writeText('contato@infoquiz.com');
                            setAlertModal({show:true, title:"Copiado", msg:"E-mail copiado com sucesso!", color:"#00bcd4"});
                        } catch {
                            setAlertModal({show:true, title:"Contato", msg:"contato@infoquiz.com", color:"#00bcd4"});
                        }
                    }}>Copiar E-mail</Button>
                </Paper>
            </Box>
            <Button variant="outlined" color="inherit" fullWidth onClick={()=>setScreen('hub')}>Voltar</Button>
        </Box>
    );
}
