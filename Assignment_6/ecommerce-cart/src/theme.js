// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: 'Quicksand, Arial, sans-serif',
        h1: {
            fontWeight: 800,
        },
        h2: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 800,
        },
        h6: {
            fontWeight: 800,
        },
    },
});

export default theme;