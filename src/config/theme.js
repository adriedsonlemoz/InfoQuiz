import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#38bdf8', contrastText: '#07131d' },
    secondary: { main: '#a78bfa', contrastText: '#0f1020' },
    error: { main: '#fb7185' },
    success: { main: '#4ade80' },
    warning: { main: '#fbbf24' },
    background: { default: '#102438', paper: '#183149' },
    text: { primary: '#f8fbff', secondary: '#bfd8eb' },
  },
  typography: { fontFamily: '"Segoe UI", Roboto, sans-serif' },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 800, borderRadius: 12, padding: '10px 14px' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { border: '1px solid rgba(148, 197, 229, 0.24)', backgroundImage: 'none' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { border: '1px solid rgba(56, 189, 248, 0.55)', backgroundColor: '#183149' },
      },
    },
  },
});
