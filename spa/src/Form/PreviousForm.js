import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material'
import CheckForm from './CheckForm';
import { headers } from '../constants/constants';
import data from '../mocks/mockedData'; // TODO: REMOVE THIS

const employeeId = localStorage.getItem('employeeId');

function PreviousForm({ day, markCompleted }) {

    const [entries, setEntries] = useState({});
    const [pendingEntries, setPendingEntries] = useState(0);
    const [completionArray, setCompletionArray] = useState([]);

    useEffect(() => {
        fetch('https://www.reto75dias.com.mx/api/methods/get-employee-entries.php?' + new URLSearchParams({
            employeeId
        }), {
            method: 'GET',
            headers,
        })
            .then(res => res.json())
            .then(data => setEntries(data))
            .catch(() => setEntries(data.mockedEntries));  // TODO: REMOVE THIS
    }, [])

    useEffect(() => {
        handleEntries();
    }, [entries]);

    const handleEntries = () => {
        let acum = 0;
        if (!entries.fromYy || (entries.fromYy && !Object.keys(entries.fromYy).length)) {
            acum = acum + 1;
        }
        if (!entries.fromPYy || (entries.fromPYy && !Object.keys(entries.fromPYy).length)) {
            acum = acum + 1;
        }
        setPendingEntries(acum);
        if (acum === 0 || pendingEntries === 0) {
            // markCompleted(true);
        }
    }

    function handleComplete(checked, index) {
        if (checked && !completionArray[index]) {
            completionArray.push(true);
            if (completionArray.length === pendingEntries && completionArray.every(ele => ele === true)) {
                markCompleted(checked);
            }
        }
        console.log({ checked, index, completionArray })
    }

    const handleEmpty = () => {
        return <Typography variant="body1" align="center">No tienes pendientes 🤩</Typography>;
    }

    const iterateForms = () => {
        const elements = [];
        for (let i = 0; i < pendingEntries; i++) {
            elements.push(
                <Grid item xs={12} lg={12}>
                    <CheckForm
                        markCompleted={(check) => handleComplete(check, i)}
                        day={day - (i + 1)}
                        title={i === 0 ? 'ayer' : 'antier'}
                    />
                </Grid>)
        }
        return elements;
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={12}>
                    <Typography variant="body1" align="left" sx={{ m: 1 }}>
                        {pendingEntries === 0 ? handleEmpty() : (<>
                            Questionario {pendingEntries} días {pendingEntries > 1 ? 'previos' : 'previo'}
                        </>)}
                    </Typography>
                </Grid>
                {iterateForms()}
            </Grid>
        </>
    );
}

export default PreviousForm;