import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Paper, TextField, Typography } from '@mui/material';

export default function IntroScreen({ data, setPlayerData, setScreen }) {
    const [nome, setNome] = useState(data.nome);
    const [avatar, setAvatar] = useState(data.avatar || '👨‍💻');
    const avatares = ['👨‍💻', '👩‍💻', '🤖', '👾', '🚀', '🧠'];

    useEffect(() => { if(data.nome) setScreen('hub'); }, []);

    return (
        <Box textAlign="center" mt={4}>
            <Typography variant="h3" fontWeight={900} sx={{ mb: 1, color: '#00bcd4' }}>
                Info<Box component="span" color="text.primary">Quiz</Box>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={4}>Trilha de Aprendizado Tecnológico</Typography>
            
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'primary.main' }}>
                <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={2} textTransform="uppercase">Selecione seu Avatar</Typography>
                <Box display="flex" justifyContent="center" gap={1.5} mb={4} flexWrap="wrap">
                    {avatares.map(icon => (
                        <Avatar key={icon} onClick={() => setAvatar(icon)} sx={{ bgcolor: avatar === icon ? 'primary.dark' : '#111', border: '2px solid', borderColor: avatar === icon ? 'primary.main' : '#333', cursor: 'pointer', width: 50, height: 50, fontSize: '1.5rem', transition: '0.2s', transform: avatar === icon ? 'scale(1.15)' : 'none' }}>
                            {icon}
                        </Avatar>
                    ))}
                </Box>
                
                <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={1} textTransform="uppercase">Credencial de Acesso</Typography>
                <TextField fullWidth variant="outlined" placeholder="Seu Nome de Usuário" value={nome} onChange={e=>setNome(e.target.value)} sx={{mb: 3, input: {textAlign: 'center', fontWeight: 'bold'}}} />
                
                <Button variant="contained" size="large" fullWidth onClick={() => { setPlayerData(p=>({...p, nome: nome||'Aluno', avatar})); setScreen('hub'); }}>Iniciar Sessão</Button>
            </Paper>
        </Box>
    );
}

