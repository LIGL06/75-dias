import * as React from 'react';
import { RouterProvider } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import './App.css';
import router from './routes/routes';
import Footer from './Components/Footer';

function App() {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Grid container spacing={10} justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <Card sx={{ minWidth: 500, marginTop: '20%' }}>
                        <RouterProvider router={router} />
                    </Card>
                </Grid>
            </Grid>
            <Footer />
        </Box>
    )
}

export default App;