/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import debounce from 'lodash.debounce';
import { headers } from '../constants/constants';
import { AppContext } from '../App';
import { FormContext } from './Form';

function CheckForm({ day }) {

    const [phrase, setPhrase] = useState('');
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [questionsChecked, setQuestionsChecked] = useState([]);
    const [sent, setSent] = useState(false);
    const { currentDay, setLoading, handleCompletion, loading } = useContext(FormContext)
    const { user } = useContext(AppContext);


    useEffect(() => {
        if (!loading) {
            getQuestions();
            getDayPhrase();
        }
    }, []);

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
                    alert('Por el momento no podemos obenter tus registro de hoy. \nPor favor, intente más tarde')
                    setLoading(false);
                });
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

    const getQuestions = useCallback(
        debounce(() => {
            if (!loading) {
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
                        alert(`Por el momento no podemos obenter tus registro del día ${day || currentDay}. \nPor favor, intente más tarde`)
                        setLoading(false);
                    });
            }
        }, 200), []);

    const getDayPhrase = useCallback(
        debounce(() => {
            if (!loading) {
                setLoading(true);
                fetch('https://www.reto75dias.com.mx/api/methods/get-day-phrase.php?' + new URLSearchParams({
                    day: day || currentDay
                }), {
                    method: 'GET',
                    headers,
                })
                    .then(res => res.json())
                    .then(data => {
                        setPhrase(data?.content);
                        setLoading(false);
                    })
                    .catch(() => {
                        alert(`Por el momento no podemos obenter la frase del día ${day || currentDay}. \nPor favor, intente más tarde`)
                        setLoading(false);
                    });
            }
        }, 200), []);

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
                .then(data => {
                    setLoading(false);
                    setSent(true);
                })
                .catch(() => {
                    setSent(true);
                    setLoading(false);
                });
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
                        {phrase}
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