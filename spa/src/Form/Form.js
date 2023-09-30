/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    createContext,
    useCallback,
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Grid,
    Step,
    Stepper,
    StepLabel,
    Paper,
    Typography,
} from '@mui/material';
import debounce from 'lodash.debounce';
import PreviousForm from './PreviousForm';
import CheckForm from './CheckForm';
import HistoryForm from './HistoryForm';
import FinishedForm from './FinishedForm';
import { headers } from '../constants/constants';

const oGSteps = ['Pendientes', 'Actual', 'Avance'];

export const FormContext = createContext({ currentDay: 0, setLoading: () => { }, handleCompletion: () => { }, activeStep: {}, setActiveStep: () => { }, handleFeedback: () => { } })

function Form() {

    const history = useNavigate();
    const [activeStep, setActiveStep] = useState({ number: 0, completed: false });
    const [steps,] = useState(oGSteps);
    const [currentDay, setCurrentDay] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!JSON.parse(user)) {
            history('/signin');
        }
        getCurrentDay();
    }, [])

    const getCurrentDay = useCallback(
        debounce(() => {
            if (!loading) {
                fetch('https://www.reto75dias.com.mx/api/methods/get-current-day.php', {
                    method: 'GET',
                    headers,
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data <= 0) {
                            alert('Regresa el 02 de Octubre para comenzar el reto.\nNos estamos preparando 🥳');
                            return setCurrentDay(0);
                        }
                        setCurrentDay(data);
                        setLoading(false);
                    })
                    .catch(() => {
                        alert('Por el momento no podemos obtener el día actual. \nPor favor, intente más tarde');
                        setLoading(false);
                    });
            }
        }, 100), []);

    const handleNext = () => {
        if (activeStep.completed) {
            setActiveStep({ number: activeStep.number + 1 });
        } else {
            alert('Completar formulario primero!');
        }
    };

    const handleBack = () => {
        setActiveStep({ number: activeStep.number - 1 });
    };

    const handleCompletion = (completed) => {
        setActiveStep({ ...activeStep, completed });
    }

    const handleFeedback = (weight, week) => {
        const formData = new FormData();
        formData.append("weight", localStorage.getItem('weight') || weight);
        formData.append("week", localStorage.getItem('week') || week);
        formData.append("employeeId", localStorage.getItem('employeeId'));
        postFeedback(formData);
    }

    const postFeedback = useCallback(
        debounce(formData => {
            if (!loading) {
                setLoading(true);
                fetch('https://www.reto75dias.com.mx/api/methods/post-feedback.php', {
                    method: 'POST',
                    headers,
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data?.id) {
                            alert('Avance creado con éxito');
                            setLoading(false);
                            setActiveStep({ ...activeStep, completed: true });
                        }
                    })
                    .catch(() => {
                        alert('Por el momento no podemos crear el avance. \nPor favor, intente más tarde');
                        setActiveStep({ ...activeStep, completed: false });
                        setLoading(false);
                    });
            }
        }, 200), [activeStep]);

    function getStepContent(step) {
        switch (step.number) {
            case 0:
                return <PreviousForm />;
            case 1:
                return <CheckForm />;
            case 2:
                return <HistoryForm />;
            case 3:
                return <FinishedForm isFinished={isFinished()} />;
            default:
                throw new Error('Unknown step');
        }
    }
    function handleButtonText() {
        if (loading) {
            return 'Cargando';
        }
        return activeStep === steps.length - 1 ? 'Completar' : 'Siguiente';
    }

    const isFinished = () => {
        return currentDay >= 75;
    }

    return (
        <>
            <FormContext.Provider value={{ currentDay, setLoading, handleCompletion, activeStep, setActiveStep, handleFeedback }}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Grid container justifyContent="center" alignItems='center'>
                            <Grid item xs={3}>
                                <img
                                    style={{ maxHeight: 50, borderRadius: 50, marginRight: 5 }}
                                    alt="sponsor-logo"
                                    src="https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-beneficios_rd0qfb.jpg"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <img
                                    style={{ maxHeight: 50, borderRadius: 50, marginRight: 5 }}
                                    alt="challenge-logo"
                                    src="https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-logo_pxkjkn.jpg"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component="h1" variant="h4" align="right" sx={{ fontWeight: 700, color: '#5EC4CC', fontFamily: 'Paytone One, sans-serif' }}>
                                    DÍA #{currentDay}
                                </Typography>
                            </Grid>



                        </Grid>
                        {
                            currentDay !== 0 ? (<>
                                <Stepper activeStep={activeStep.number} sx={{ pt: 3, pb: 5 }}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep.number !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                        disabled={!activeStep.completed || loading}
                                    >
                                        {handleButtonText()}
                                    </Button>
                                </Box>
                            </>) : null
                        }

                    </Paper>
                </Container>
            </FormContext.Provider>
        </>
    );
}

export default Form;