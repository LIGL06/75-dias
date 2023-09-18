import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function LandingActions() {

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Button size='small'><Link to={'signin'}>{'Iniciar Sesión'}</Link></Button>
                </Grid>
                <Grid item>
                    <Button size='small'><Link to={'signup'}>{'Registrarse'}</Link></Button>
                </Grid>
            </Grid>

        </>
    );
}

export default LandingActions;