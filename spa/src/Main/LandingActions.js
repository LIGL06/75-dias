import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function LandingActions() {

    return (
        <>
            <Button size='small'><Link to={'signin'}>{'Iniciar Sesión'}</Link></Button>
            <Button size='small'><Link to={'signup'}>{'Registrarse'}</Link></Button>
        </>
    );
}

export default LandingActions;