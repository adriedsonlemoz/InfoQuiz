import { Box, Button, Paper, Typography } from '@mui/material';

export default function AboutScreen({ setScreen, setAlertModal }) {
    return (
        <Box mt={2}>
            <Typography variant="h5" color="primary" align="center" fontWeight="bold" mb={1}>Central de ajuda</Typography>
            <Typography variant="body2" color="text.secondary" align="center" mb={3}>Regras do curso, progresso e funcionamento offline.</Typography>
            <Box sx={{ maxHeight: '64vh', overflowY: 'auto', pr: 1, mb: 3 }}>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2" color="primary" borderBottom="1px solid rgba(148,197,229,0.2)" pb={1} mb={2}>📖 Perguntas frequentes</Typography>
                    <Box mb={2}><Typography variant="body2" fontWeight="bold">Como libero o próximo módulo?</Typography><Typography variant="caption" color="text.secondary">Conclua a avaliação do módulo anterior com pelo menos 60% de aproveitamento e termine a prova com pelo menos uma vida.</Typography></Box>
                    <Box mb={2}><Typography variant="body2" fontWeight="bold">Como funciona a energia?</Typography><Typography variant="caption" color="text.secondary">Cada avaliação consome 1 ponto de energia. Ela recarrega automaticamente com o tempo. O modo Prática não consome energia.</Typography></Box>
                    <Box mb={2}><Typography variant="body2" fontWeight="bold">As perguntas se repetem?</Typography><Typography variant="caption" color="text.secondary">Cada módulo possui 15 perguntas revisadas. A cada sessão são sorteadas 5, então as tentativas podem trazer combinações diferentes.</Typography></Box>
                    <Box mb={2}><Typography variant="body2" fontWeight="bold">Como funciona a Revisão de Erros?</Typography><Typography variant="caption" color="text.secondary">Questões erradas em avaliações ficam salvas na revisão. Ao acertá-las no modo de revisão, elas são removidas da lista de pendências.</Typography></Box>
                    <Box mb={2}><Typography variant="body2" fontWeight="bold">O aplicativo precisa de internet?</Typography><Typography variant="caption" color="text.secondary">Não. Conteúdo, perguntas, sons e progresso funcionam localmente. O APK também é preparado sem a permissão Android de acesso à internet.</Typography></Box>
                    <Box><Typography variant="body2" fontWeight="bold">Como protejo meu progresso?</Typography><Typography variant="caption" color="text.secondary">No Painel, use Exportar para criar um arquivo JSON de backup. Use Importar para restaurá-lo depois. Limpar os dados do aplicativo sem backup remove o progresso local.</Typography></Box>
                </Paper>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2" color="success.main" mb={1}>💾 Backup do progresso</Typography>
                    <Typography variant="caption" color="text.secondary">O backup contém seu nome, progresso, estatísticas, conquistas, energia e lista de revisão. Ele não envia dados para servidor algum.</Typography>
                </Paper>
                <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="primary" mb={1}>✉️ Contato do projeto</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" mb={2}>O InfoQuiz é gratuito, funciona sem conta online e não envia seu progresso para servidores.</Typography>
                    <Box p={1.5} bgcolor="rgba(7,19,29,0.45)" border="1px dashed rgba(56,189,248,0.65)" color="primary.main" borderRadius={2} mb={2} fontFamily="monospace">contato@infoquiz.com</Box>
                    <Button variant="outlined" color="primary" size="small" onClick={async () => {
                        try {
                            await navigator.clipboard.writeText('contato@infoquiz.com');
                            setAlertModal({ show: true, title: 'Copiado', msg: 'E-mail copiado com sucesso!', color: '#38bdf8' });
                        } catch {
                            setAlertModal({ show: true, title: 'Contato', msg: 'contato@infoquiz.com', color: '#38bdf8' });
                        }
                    }}>Copiar e-mail</Button>
                </Paper>
            </Box>
            <Button variant="outlined" color="inherit" fullWidth onClick={() => setScreen('hub')}>Voltar</Button>
        </Box>
    );
}
