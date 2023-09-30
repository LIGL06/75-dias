import React, { createContext, useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import {
    Box,
    Card,
    Container,
    CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import router from './routes/routes';
import Footer from './Components/Footer';

const defaultTheme = createTheme();
export const AppContext = createContext({ user: {}, setUser: () => { } })

export default function App() {
    const [user, setUser] = useState({})

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    return (
        <>
            <AppContext.Provider value={{ user, setUser }}>
                <ThemeProvider theme={defaultTheme}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100vh',
                        }}
                    >
                        <CssBaseline />
                        <Container maxWidth="lg" sx={{ m: 'auto' }}>
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
                                <Footer employeeId={user.employeeId} />
                            </Container>
                        </Box>
                    </Box>
                </ThemeProvider>
            </AppContext.Provider>
        </>
    )
}
