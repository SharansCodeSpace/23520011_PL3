import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';

function Navbar() {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={{ backgroundColor: '#334155' }}>
                <Toolbar className="flex justify-between">
                    <Typography variant="h6" component={Link} to="/">Amazon India</Typography>
                    <div>
                        <Button color="inherit" component={Link} to="/">Products</Button>
                        <Button color="inherit" component={Link} to="/cart">Cart</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default Navbar;
