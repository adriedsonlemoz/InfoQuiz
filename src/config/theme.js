import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4', contrastText: '#000' },
    secondary: { main: '#8a2be2', contrastText: '#fff' },
    error: { main: '#ff1744' },
    success: { main: '#00e676' },
    warning: { main: '#ff9800' },
    background: { default: '#050a0f', paper: '#0b131c' },
    text: { primary: '#ffffff', secondary: '#90caf9' },
  },
  typography: { fontFamily: '"Segoe UI", Roboto, sans-serif' },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'uppercase', fontWeight: 900, borderRadius: 12, padding: '12px' } } },
    MuiPaper: { styleOverrides: { root: { border: '1px solid #1e3a5f' } } },
    MuiDialog: { styleOverrides: { paper: { border: '2px solid #00bcd4', backgroundColor: '#0b131c' } } },
  },
});
