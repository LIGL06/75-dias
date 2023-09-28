import * as React from 'react';
import { Link, Typography } from '@mui/material';

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
            <Typography variant="caption" display="block" align='center' gutterBottom>
                {'Made with 🖤 by: '}
                <Link href="mailto:luis.garcialuna@outlook.com?Subject=Interesado en tus servicios" color="inherit">
                    {'Iván García'}
                </Link>
                {'.'}
            </Typography>
        </>
    );
}

export default Footer;