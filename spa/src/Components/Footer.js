import React, { useContext } from 'react';
import { Link, Typography } from '@mui/material';
import { AppContext } from '../App';

function Footer() {
    const { user } = useContext(AppContext)

    return (
        <>
            {user.employee_id &&
                <Typography variant='caption' display="block" color='text.secondary' align='center' sx={{ m: 1 }}>
                    {`#empleado ${user.employee_id} - `}
                    <Link href="/logout" color="inherit">
                        {'Cerrar sesión'}
                    </Link>{' '}
                </Typography>
            }
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