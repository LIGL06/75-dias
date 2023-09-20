import * as React from 'react';
import { Grid, Typography } from '@mui/material'

function HistoryForm({ completed }) {
    console.log({ completed })

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h5" align="center">
                        Historico + Feedback
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default HistoryForm;