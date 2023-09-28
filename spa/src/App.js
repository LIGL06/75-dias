import * as React from 'react';
import { RouterProvider } from "react-router-dom";
import {
    Box,
    Card,
    Container,
    CssBaseline,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import router from './routes/routes';
import Footer from './Components/Footer';

const defaultTheme = createTheme();

export default function App() {

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    }}
                >
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <Card>
                            <RouterProvider router={router} />
                        </Card>
                    </Container>
                    <Box
                        component="footer"
                        sx={{
                            py: 3,
                            px: 2,
                            mt: 'auto',
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[800],
                        }}>
                        <Container maxWidth="lg">
                            <Footer />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}
