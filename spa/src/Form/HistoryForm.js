/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    Checkbox, FormGroup, FormControlLabel,
    FormLabel, Grid, Typography, TextField,
    InputAdornment
} from '@mui/material';
import { Scale as ScaleIcon } from '@mui/icons-material';
import debounce from 'lodash.debounce';
import { FormContext } from './Form';

function HistoryForm() {
    const [applies, setApplies] = useState(true);
    const [form, setForm] = useState({});
    const { handleCompletion, currentDay, handleFeedback, setLoading } = useContext(FormContext);

    useEffect(() => {
        if (currentDay % 7 !== 0) {
            handleCompletion(true);
        }
    }, [])

    useEffect(() => {
        if (!applies) {
            handleCompletion(true);
        }
    }, [applies])

    useEffect(() => {
        if (form?.weight) {
            setLoading(true);
            verify(form.weight);
        }
    }, [form])

    const verify = useCallback(
        debounce(weight => {
            const week = currentDay / 7;
            if (week >= 1) {
                localStorage.setItem('weight', weight);
                localStorage.setItem('week', week);
                handleFeedback(weight, week);
            }
        }, 1000), []);

    const handleChange = e => {
        setForm({ ...form, weight: e.target.value });
    }

    function renderWeight() {
        return (<>
            <Typography variant="body1" align="left" sx={{ m: 1 }}>
                ¡Felicidades has completado una semana del reto!
            </Typography>
            <FormLabel component="legend">Guarda el progreso de tu avance en este apartado 👏</FormLabel>
            <FormGroup sx={{ m: 3 }}>
                <FormControlLabel
                    label="Si no tienes tu peso, checa ésta casilla"
                    control={<Checkbox
                        checked={!applies}
                        onChange={() => setApplies(!applies)}
                        name="applies"
                        color='default'
                        defaultChecked
                    />}
                />
            </FormGroup>
            <FormGroup sx={{ m: 5 }}>
                <TextField
                    required
                    fullWidth
                    type='number'
                    id='weight'
                    label='Peso (kgs)'
                    defaultValue={10}
                    inputProps={{
                        step: 0.05,
                        min: 10,
                        max: 150,
                        inputMode: 'decimal',
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <ScaleIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    onKeyUp={() => verify(form?.weight)}
                    error={!(form.weight >= 10.00 && form.weight <= 150.00)}
                    disabled={!applies}
                    variant='standard'
                />
            </FormGroup>
        </>);
    }

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h5" align="center">
                        {currentDay % 7 === 0 ? renderWeight() : (<>
                            Gracias por completar tu registro de hoy 🤗</>)}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default HistoryForm;