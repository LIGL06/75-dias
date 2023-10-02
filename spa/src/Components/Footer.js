import React, { useContext } from 'react';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
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
            <Box>
                <Grid container>
                    <Grid item xs>
                        <Typography variant='caption' display="block" color='text.secondary' align='center' sx={{ m: 1 }}>
                            <Button size="small"><Link href="/" color="inherit" >{"Inicio"}</Link></Button>
                        </Typography>
                    </Grid>
                    {user.employee_id &&
                        <Grid item xs>
                            <Typography variant='caption' display="block" color='text.secondary' align='center' sx={{ m: 1 }}>
                                <Button size="small" onClick={handleLogout}><Link color="inherit" >{"Cerrar sesión"}</Link></Button>
                            </Typography>
                        </Grid>
                    }
                </Grid>
                <Typography variant='body2' color='text.secondary' align='center' sx={{ mb: 2 }}>
                    {'Copyright © '}
                    <img
                        style={{ maxHeight: 30, borderRadius: 50, verticalAlign: 'middle', marginRight: 5 }}
                        alt="sponsor-logo"
                        src="https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-creator_xjqjiq.jpg"
                    />
                    <a href="https://medicinafuncionalmty.com" target='_blank' rel="noreferrer">
                        {'Medicina Funcional MTY'}
                    </a>&nbsp;
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>

                <Typography variant="caption" display="block" align='center' gutterBottom sx={{ m: 1, fontSize: 10 }}>
                    <code>{'<coded/>'}</code>{' with 🖤 by: '}
                    <Link href="mailto:luis.garcialuna@outlook.com?Subject=Interesado en tus servicios 🧑🏾‍💻" color="inherit">
                        {'Iván García'}
                    </Link>
                    {' 🧑🏾‍💻 .'}
                </Typography>
            </Box>

        </>
    );
}

export default Footer;