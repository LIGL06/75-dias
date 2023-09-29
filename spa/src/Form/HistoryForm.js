/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
    Checkbox, FormGroup, FormControlLabel,
    FormLabel, Grid, Typography, TextField,
    InputAdornment
} from '@mui/material';
import { Scale as ScaleIcon } from '@mui/icons-material';
import { FormContext } from './Form';

function HistoryForm() {
    const [applies, setApplies] = useState(true);
    const [form, setForm] = useState({});
    const { handleCompletion, currentDay } = useContext(FormContext);

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

    function renderWeight() {
        return (<>
            <Typography variant="body1" align="left" sx={{ m: 1 }}>
                ¡Felicidades haz completado una semana del reto!
            </Typography>
            <FormLabel component="legend">Guarda el progreso de tu avance en este apartado 👏</FormLabel>
            <FormGroup sx={{ m: 3 }}>
                <FormControlLabel
                    label="No aplica"
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
                    id='weigth'
                    label='Peso (kgs)'
                    defaultValue={10}
                    inputProps={{
                        step: 0.05,
                        min: 10,
                        max: 150
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <ScaleIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={e => setForm({ ...form, weigth: e.target.value })}
                    error={!(form.weigth >= 10.00 && form.weigth <= 150.00)}
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