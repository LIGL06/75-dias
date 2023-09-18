import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <>
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link href="/#" color="inherit">
                {'Reto 75 días'}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
            {'Made with 🖤 by: '}
            <Link href="mailto:luis.garcialuna@outlook.com" color="inherit">
                {'Iván García'}
            </Link>
            {'.'}
        </Typography>
        </>
    );
}

export default Footer;