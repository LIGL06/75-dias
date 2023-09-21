import * as React from 'react';
import { Grid, Typography } from '@mui/material'
import CheckForm from './CheckForm';

function PreviousForm({ pendingEntries, day, handleCompletion }) {

    function handleComplete() {
        console.log('mark completed!');
    }

    const iterateForms = () => {
        const elements = [];
        for (let i = 0; i < pendingEntries; i++) {
            elements.push(<CheckForm markCompleted={handleComplete} day={day - (i + 1)} title={i === 0 ? 'ayer' : 'antier'} />)
        }
        return elements;
    }

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h5" align="center">
                        {pendingEntries === 0 ? ('No tienes pendientes!') : (<>
                            Questionario {pendingEntries} días {pendingEntries > 1 ? 'previos' : 'previo'}
                            {iterateForms()}
                        </>)}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default PreviousForm;