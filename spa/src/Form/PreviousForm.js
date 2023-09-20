import * as React from 'react';
import { Grid, Typography } from '@mui/material'

function PreviousForm({ pendingEntries }) {

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h5" align="center">
                        {pendingEntries === 0 ? ('No tienes pendientes!') : (<>
                            Questionario {pendingEntries} días {pendingEntries > 1 ? 'previos' : 'previo'}
                        </>)}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default PreviousForm;