import * as React from 'react';
import { Grid, Typography } from '@mui/material'

function CheckForm({ completed }) {
    console.log({ completed })

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h5" align="center">
                        Questionario de hoy
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default CheckForm;