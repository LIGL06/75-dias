/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material'
import CheckForm from './CheckForm';
import { headers } from '../constants/constants';
import { FormContext } from './Form';
import data from '../mocks/mockedData'; // TODO: REMOVE THIS

const employeeId = localStorage.getItem('employeeId');

function PreviousForm() {

    const [entries, setEntries] = useState({});
    const [pendingEntries, setPendingEntries] = useState(0);
    const [completionArray,] = useState([]);
    const [, setFromYy] = useState(false);
    const [, setFromPYy] = useState(false);
    const { currentDay, setLoading, handleCompletion } = useContext(FormContext)

    useEffect(() => {
        // TODO: CHECK FOR VISITED & REFILL
        setLoading(true);
        fetch('https://www.reto75dias.com.mx/api/methods/get-employee-entries.php?' + new URLSearchParams({
            employeeId
        }), {
            method: 'GET',
            headers,
        })
            .then(res => res.json())
            .then(data => { setEntries(data); setLoading(false); })
            .catch(() => { setEntries(data.mockedEntries); setLoading(false); });  // TODO: REMOVE THIS
    }, [])

    useEffect(() => {
        handleEntries();
    }, [entries]);

    const handleEntries = () => {
        let acum = 0;
        if (!entries.fromYy || (entries.fromYy && !Object.keys(entries.fromYy).length)) {
            acum = acum + 1;
            setFromYy(true);
        }
        if (!entries.fromPYy || (entries.fromPYy && !Object.keys(entries.fromPYy).length)) {
            acum = acum + 1;
            setFromPYy(true);
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
                handleCompletion(checked);
            }
        }
    }

    const handleEmpty = () => {
        return <Typography variant="body1" align="center">No tienes pendientes 🤩</Typography>;
    }

    const handleDay = () => {
        if (!currentDay || currentDay === 0) {
            alert('Error al cargar día');
        }
        if (!entries.fromYy) {
            return currentDay - 1;
        }
        if (!entries.fromPYy) {
            return currentDay - 2;
        }
    }

    const handleTitle = (index) => {
        if (Math.abs(currentDay - index) === 1) {
            return 'ayer';
        } else {
            return 'antier';
        }
    }

    const handleTitleAlt = () => {
        if (!entries.fromYy) {
            return 'ayer';
        }
        if (!entries.fromPYy) {
            return 'antier';
        }
    }

    const iterateForms = () => {
        const elements = [];
        for (let i = 0; i < pendingEntries; i++) {
            elements.push(
                <Grid item xs={12} lg={12}>
                    <CheckForm
                        markCompleted={(check) => handleComplete(check, i)}
                        day={pendingEntries >= 2 ? currentDay - (i + 1) : handleDay()}
                        title={pendingEntries >= 2 ? handleTitle(currentDay - (i + 1)) : handleTitleAlt()}
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
                        {pendingEntries === 0 ? handleEmpty() : null}
                    </Typography>
                </Grid>
                {iterateForms()}
            </Grid>
        </>
    );
}

export default PreviousForm;