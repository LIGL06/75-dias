import React, { useContext, useEffect, useState } from 'react';
import {
    Grid,
    Typography,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox
} from '@mui/material';
import { headers } from '../constants/constants';
import { FormContext } from './Form';
import data from '../mocks/mockedData'; // TODO: REMOVE THIS

const hasTodayAnswer = localStorage.getItem('hasTodayAnswer');

function CheckForm({ day, title = 'hoy' }) {

    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [questionsChecked, setQuestionsChecked] = useState([]);
    const [sent, setSent] = useState(false);
    const { currentDay, setLoading, handleCompletion } = useContext(FormContext)


    useEffect(() => {
        // TODO: CHECK FOR VISITED
        if (!hasTodayAnswer) {
            setLoading(true);
            fetch('https://www.reto75dias.com.mx/api/methods/get-questions.php', {
                method: 'GET',
                headers,
            })
                .then(res => res.json())
                .then(data => {
                    const questions = [];
                    for (const [, value] of Object.entries(data)) {
                        questions.push(value)
                    }
                    setCurrentQuestions(questions);
                    setQuestionsChecked([...Array(questions.length).keys()].map(i => false));
                    setLoading(false);
                })
                .catch(() => {
                    const questions = [];
                    for (const [, value] of Object.entries(data.mockedQuestions)) {
                        questions.push(value)
                    }
                    setCurrentQuestions(questions);
                    setQuestionsChecked([...Array(questions.length).keys()].map(i => false));
                    setLoading(false);
                }); // TODO: REMOVE THIS
        } else {
            setCurrentQuestions([]);
        }
    }, [])

    function handleChange(e) {
        setQuestionsChecked({ ...questionsChecked, [e.target.name]: e.target.checked });
    }

    const handleComplete = async (e) => {
        if (e.target.checked && !sent) {
            const formData = new FormData();
            formData.append('employeeId', localStorage.getItem('employeeId'));
            const ids = [];
            for (const [key, value] of Object.entries(questionsChecked)) {
                if (value) {
                    ids.push(key);
                }
            }
            formData.append('ids', ids);
            formData.append('day', day || currentDay);
            setLoading(true);
            await fetch('https://www.reto75dias.com.mx/api/methods/post-form.php', {
                method: 'POST',
                headers,
                body: formData
            })
                .then(res => res.json())
                .then(data => { console.log({ data }); setLoading(false); setSent(true); })
                .catch(() => {
                    setSent(true);
                    setLoading(false);
                    // Emulate success
                }); // TODO: REMOVE THIS
        }
        handleCompletion(e.target.checked);
    }

    const handleEmpty = () => {
        return <Typography variant="body1" align="center">No tienes pendientes 🤩</Typography>;
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={12}>
                    <Typography variant="h5" align="center">
                        Questionario de {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="outlined">
                        <FormLabel component="legend">Contesta de manera honesta</FormLabel>
                        {currentQuestions.map((question, index) => (
                            <FormGroup key={"question-" + question.id} sx={{ mt: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={questionsChecked[index + 1]} onChange={handleChange} name={question.id} color="success" />
                                    }
                                    label={question.content}
                                    labelPlacement={"end"}
                                />
                            </FormGroup>
                        ))}
                        <FormGroup sx={{ mt: 5 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={handleComplete} defaultChecked={false} name="complete" />
                                }
                                label="Contesté de manera honesta"
                                sx={{ color: "green" }}
                            />
                        </FormGroup>
                        <FormHelperText>La útlima casilla habilita el guardado</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Typography variant="body1" align="left" sx={{ m: 1 }}>
                        {currentQuestions.length === 0 ? handleEmpty() : null}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default CheckForm;