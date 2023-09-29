/* eslint-disable react-hooks/exhaustive-deps */
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
import { AppContext } from '../App';
import { FormContext } from './Form';
import data from '../mocks/mockedData'; // TODO: REMOVE THIS

function CheckForm({ day, title = 'hoy' }) {

    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [questionsChecked, setQuestionsChecked] = useState([]);
    const [sent, setSent] = useState(false);
    const { currentDay, setLoading, handleCompletion } = useContext(FormContext)
    const { user } = useContext(AppContext);


    useEffect(() => {
        // TODO: CHECK FOR VISITED
        setLoading(true);

        fetch('https://www.reto75dias.com.mx/api/methods/get-questions.php', {
            method: 'GET',
            headers,
        })
            .then(res => res.json())
            .then(data => {
                const questions = [];
                const answered = [];
                for (const [, value] of Object.entries(data)) {
                    questions.push(value)
                    answered.push({ [value.id]: false })
                }
                setCurrentQuestions(questions);
                setQuestionsChecked(answered);
                setLoading(false);
            })
            .catch(() => {
                const questions = [];
                const answered = [];
                for (const [, value] of Object.entries(data.mockedQuestions)) {
                    questions.push(value)
                    answered.push({ [value.id]: false })
                }
                setCurrentQuestions(questions);
                setQuestionsChecked(answered);
                setLoading(false);
            }); // TODO: REMOVE THIS

    }, [])

    useEffect(() => {
        if (currentQuestions.length) {
            fetch('https://www.reto75dias.com.mx/api/methods/get-employee-day-entries.php?' + new URLSearchParams({
                employeeId: user.employee_id,
                day: day || currentDay
            }), {
                method: 'GET',
                headers,
            })
                .then(res => res.json())
                .then(data => {
                    const questions = [];
                    for (const [, value] of Object.entries(data)) {
                        const question = currentQuestions.find(element => element.id === value.question_id);
                        if (question) {
                            questions.push(question.id);
                        }
                    }
                    setQuestionsChecked(questions);
                    setLoading(false);
                })
                .catch(() => {
                    const questions = [];
                    for (const [, value] of Object.entries(data.mockedDayEntries)) {
                        const question = currentQuestions.find(element => element.id === value.question_id);
                        if (question) {
                            questions.push(question.id);
                        }
                    }
                    setQuestionsChecked(questions);
                    setLoading(false);
                });  // TODO: REMOVE THIS
        }
    }, [currentQuestions])

    function handleChange(e) {
        if (e.target.checked) {
            setQuestionsChecked([...questionsChecked, e.target.name]);
        } else {
            const elements = questionsChecked.filter(el => el !== e.target.name);
            setQuestionsChecked(elements);
        }
    }

    const handleComplete = async (e) => {
        if (e.target.checked && !sent) {
            const formData = new FormData();
            formData.append('employeeId', user.employee_id);
            const ids = [];
            for (const [, entry] of Object.entries(questionsChecked)) {
                ids.push(entry);
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

    const handleChecked = (questionId) => {
        return !!questionsChecked.find(el => el === questionId);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={12}>
                    <Typography variant="h5" align="center">
                        FRASE DEL DÍA
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="outlined">
                        <FormLabel component="legend">Questionario de día #{day || currentDay}</FormLabel>
                        {currentQuestions.map(question => (
                            <FormGroup key={"question-" + question.id} sx={{ mt: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked={false}
                                            checked={handleChecked(question.id) || false}
                                            onChange={handleChange}
                                            name={question.id}
                                            color="success"
                                        />
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