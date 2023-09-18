import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    mb: 0,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant='body2' color='text.secondary' align='center'>
                        {'Copyright © '}
                        <Link href="/#" color="inherit">
                            {'Reto 75 días'}
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                    <Typography variant="caption" display="block" align='center' gutterBottom>
                        {'Made with 🖤 by: '}
                        <Link href="mailto:luis.garcialuna@outlook.com" color="inherit">
                            {'Iván García'}
                        </Link>
                        {'.'}
                    </Typography>
                </Container>
            </Box>
        </>
    );
}

export default Footer;