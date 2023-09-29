/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    createContext,
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    Step,
    Stepper,
    StepLabel,
    Paper,
    Typography,
} from '@mui/material';
import PreviousForm from './PreviousForm';
import CheckForm from './CheckForm';
import HistoryForm from './HistoryForm';
import FinishedForm from './FinishedForm';
import { headers } from '../constants/constants';
import data from '../mocks/mockedData'; // TODO: REMOVE THIS

const oGSteps = ['Pendientes', 'Actual', 'Avance'];

export const FormContext = createContext({ currentDay: 0, setLoading: () => { }, handleCompletion: () => { }, activeStep: {}, setActiveStep: () => { } })

function Form() {

    const history = useNavigate();
    const [activeStep, setActiveStep] = useState({ number: 0, completed: false });
    const [steps,] = useState(oGSteps);
    const [currentDay, setCurrentDay] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    useEffect(() => {
        const employeeId = localStorage.getItem('employeeId');
        if (!employeeId) {
            history('/signin');
        }
        setLoading(true);
        fetch('https://www.reto75dias.com.mx/api/methods/get-current-day.php', {
            method: 'GET',
            headers,
        })
            .then(res => res.json())
            .then(data => { setCurrentDay(data); setLoading(false); })
            .catch(() => { setCurrentDay(data.mockedCurrentDay); setLoading(false); }); // TODO: REMOVE THIS
    }, [])

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
        setSuccessAlert(true);
        setActiveStep({ ...activeStep, completed });
    }

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

    const renderSuccessAlert = () => {
        return <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>check it out!</strong>
        </Alert>;
    }

    const isFinished = () => {
        return currentDay === 75;
    }

    return (
        <>
            <FormContext.Provider value={{ currentDay, setLoading, handleCompletion, activeStep, setActiveStep }}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="right">
                            Día #{currentDay}
                        </Typography>
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
                                disabled={!activeStep.completed}
                            >
                                {handleButtonText()}
                            </Button>
                        </Box>

                    </Paper>
                </Container>
            </FormContext.Provider>
        </>
    );
}

export default Form;