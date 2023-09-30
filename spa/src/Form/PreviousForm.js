/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material'
import CheckForm from './CheckForm';
import { headers } from '../constants/constants';
import { FormContext } from './Form';
import debounce from 'lodash.debounce';

const employeeId = localStorage.getItem('employeeId');

function PreviousForm() {

    const [entries, setEntries] = useState({});
    const [pendingEntries, setPendingEntries] = useState(0);
    const [completionArray,] = useState([]);
    const [, setFromYy] = useState(false);
    const [, setFromPYy] = useState(false);
    const { currentDay, setLoading, handleCompletion, loading } = useContext(FormContext);

    useEffect(() => {
        // TODO: CHECK FOR VISITED & REFILL
        setLoading(true);
        getEmployeeEntries();
    }, []);

    const getEmployeeEntries = useCallback(
        debounce(() => {
            if (!loading) {
                fetch('https://www.reto75dias.com.mx/api/methods/get-employee-entries.php?' + new URLSearchParams({
                    employeeId
                }), {
                    method: 'GET',
                    headers,
                })
                    .then(res => res.json())
                    .then(data => {
                        if (currentDay === 1) {
                            setLoading(false);
                            setPendingEntries(0);
                            return;
                        }
                        setEntries(data);
                        setLoading(false);
                    })
                    .catch(() => {
                        alert('Por el momento no podemos obenter tus registros previos. \nPor favor, intente más tarde');
                        setLoading(false);
                    });  // TODO: REMOVE THIS
            }
        }, 100), []);

    useEffect(() => {
        if (pendingEntries === 0 || currentDay === 1) {
            handleCompletion(true);
        }
    }, [pendingEntries]);

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
                    {currentDay >= 2 &&
                        <CheckForm
                            markCompleted={(check) => handleComplete(check, i)}
                            day={pendingEntries >= 2 ? currentDay - (i + 1) : handleDay()}
                            title={pendingEntries >= 2 ? handleTitle(currentDay - (i + 1)) : handleTitleAlt()}
                        />
                    }
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