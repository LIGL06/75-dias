import React, { useContext } from 'react';
import { Button, Link, Typography } from '@mui/material';
import { AppContext } from '../App';

function Footer() {
    const { user } = useContext(AppContext)

    function handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('employeeId');
        localStorage.clear();
        setTimeout(() => {
            window.location.reload();
        }, 500)
    }

    return (
        <>
            {user.employee_id &&
                <Typography variant='caption' display="block" color='text.secondary' align='center' sx={{ m: 0 }}>
                    {`#empleado ${user.employee_id} - `}
                    <Button size="large" onClick={handleLogout}><Link color="inherit" >{"Cerrar sesión"}</Link></Button>
                </Typography>
            }
            <Typography variant='body2' color='text.secondary' align='center'>
                {'Copyright © '}
                <a href="https://medicinafuncionalmty.com" target='_blank' rel="noreferrer">
                    {'Medicina Funcional MTY'}
                </a>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>

            <Typography variant="caption" display="block" align='center' gutterBottom sx={{ m: 1, fontSize: 8 }}>
                {'<Coded> with 🖤 by: '}
                <Link href="mailto:luis.garcialuna@outlook.com?Subject=Interesado en tus servicios" color="inherit">
                    {'Iván García'}
                </Link>
                {'.'}
            </Typography>
        </>
    );
}

export default Footer;