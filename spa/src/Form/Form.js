import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Box,
    Button
} from '@mui/material';
import PreviousForm from './PreviousForm';
import CheckForm from './CheckForm';
import HistoryForm from './HistoryForm';

const steps = ['Pendientes', 'Actual', 'Avance'];
const employeeId = localStorage.getItem('employeeId');
const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'User-Agent': 'Reto-75-dias-v1',
})
const mockedCurrentDay = 7;
const mockedEntries = { "days": { "today": "2023-09-20", "yesterday": "2023-09-19", "prev48Hrs": "2023-09-18" }, "fromTy": { "id": "3", "employee_id": "5", "question_id": "1", "day": "20", "createdAt": "2023-09-20" }, "fromYy": { "id": "3", "employee_id": "5", "question_id": "1", "day": "20", "createdAt": "2023-09-20" }, "fromPYy": { "id": "3", "employee_id": "5", "question_id": "1", "day": "20", "createdAt": "2023-09-20" } };

function Form() {

    const [activeStep, setActiveStep] = useState({ number: 0, completed: false });
    const [entries, setEntries] = useState({});
    const [pendingEntries, setPendingEntries] = useState(0);
    const [currentDay, setCurrentDay] = useState(0);

    useEffect(() => {
        fetch('https://www.reto75dias.com.mx/api/methods/get-current-day.php', {
            method: 'GET',
            headers,
        })
            .then(res => res.json())
            .then(data => setCurrentDay(data))
            .catch(() => setCurrentDay(mockedCurrentDay)); // TODO: REMOVE THIS
        fetch('https://www.reto75dias.com.mx/api/methods/get-employee-entries.php?' + new URLSearchParams({
            employeeId
        }), {
            method: 'GET',
            headers,
        })
            .then(res => res.json())
            .then(data => setEntries(data))
            .catch(() => setEntries(mockedEntries));  // TODO: REMOVE THIS
    }, [])

    useEffect(() => {
        let acum = 0;
        if (entries.fromYy && !Object.keys(entries.fromYy).length) {
            acum = acum + 1;
        }
        if (entries.fromPYy && !Object.keys(entries.fromPYy).length) {
            acum = acum + 1;
        }
        setPendingEntries(acum);
        if (acum === 0) {
            setActiveStep({ ...activeStep, completed: true })
        }
        // TODO: Si hay 0 pendientes brincar al paso Actual, Sino mostrar los cuestionarios por cada día pendiente
    }, [entries]);

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

    function getStepContent(step) {
        switch (step.number) {
            case 0:
                return <PreviousForm pendingEntries={pendingEntries} day={currentDay} markCompleted={handleCompletion} />;
            case 1:
                return <CheckForm markCompleted={handleCompletion} day={currentDay} />;
            case 2:
                return <HistoryForm completed={step.completed} />;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <>
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
                    {activeStep.number === steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Gracias por tu registro
                            </Typography>
                            <Typography variant="subtitle1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas vel nisi vel tristique. Proin laoreet nibh eu sapien placerat dapibus. Vestibulum fringilla a magna eleifend malesuada. Ut sem leo, rutrum at nunc quis, mollis ullamcorper dui.
                            </Typography>
                        </>
                    ) : (
                        <>
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
                                    {activeStep === steps.length - 1 ? 'Completar' : 'Siguiente'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Container>
        </>
    );
}

export default Form;